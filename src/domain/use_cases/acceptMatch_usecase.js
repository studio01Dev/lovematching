import MyResponse from "../models/MyResponse"
import { getDocs, collection, getDoc, setDoc, deleteDoc, doc, addDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import db from '../../firebase/index';

async function markRecommendHistoryRejectedByCounterpart(applicantUid, counterpartUid) {
    const historySnapshot = await getDocs(collection(db.db, 'users', applicantUid, 'RecommendHistory'));
    const matchingEntries = [];

    historySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.counterpartUserId === counterpartUid && data.status === 'accepted') {
            matchingEntries.push({ id: docSnap.id, recommendedAt: data.recommendedAt });
        }
    });

    if (matchingEntries.length === 0) {
        return;
    }

    matchingEntries.sort((a, b) => {
        const aTime = a.recommendedAt?.toMillis?.() ?? 0;
        const bTime = b.recommendedAt?.toMillis?.() ?? 0;
        return bTime - aTime;
    });

    await updateDoc(doc(db.db, 'users', applicantUid, 'RecommendHistory', matchingEntries[0].id), {
        status: 'rejected_by_counterpart',
        statusUpdatedAt: serverTimestamp(),
    });
}

async function createDeclineHistory(rejectorUid, applicantUid, applicantSnapshot) {
    let userData = applicantSnapshot;

    if (!userData) {
        const userSnap = await getDoc(doc(db.db, 'users', applicantUid));
        userData = userSnap.exists() ? userSnap.data() : {};
    }

    await addDoc(collection(db.db, 'users', rejectorUid, 'DeclineHistory'), {
        ...userData,
        id: applicantUid,
        counterpartUserId: applicantUid,
        declineType: 'rejected_incoming',
        declinedAt: serverTimestamp(),
    });
}

export default class AcceptMatchUseCase {

    async readInCounterChosenFromAdminSuggestList(uid) {
        try {
            const userList = []
            const querySnapshot = await getDocs(collection(db.db, "users", uid, "InCounterChosenFromAdminSuggestList"))
            querySnapshot.forEach(
                (doc) => {
                    userList.push(
                        {
                            ...doc.data(),
                            id: doc.id
                        }
                    )
                }
            )
            var response = new MyResponse(true, userList, "요청이 성공적으로 처리되었습니다.");
            return response;
        } catch(error) {
            var response = new MyResponse(false, false, "네트워크 오류입니다. 다시 시도하거나, 관리자에게 문의해주세요.")
            return response
        }
    }


    async acceptMatch(myUid, counterUid) {
        try {
            // 1. delete counter in my InCounterChosenFromAdminSuggestList
            await deleteDoc(doc(db.db, "users", myUid, "InCounterChosenFromAdminSuggestList", counterUid));

            // 2. delete me in counter ChosenFromAdminSuggestList
            await deleteDoc(doc(db.db, "users", counterUid, "ChosenFromAdminSuggestList", myUid));

            // 3. create Pair in FirstMatching (기존 전역 컬렉션 유지)
            const matchedAt = new Date();
            const docRef1 = await addDoc(collection(db.db, "FirstMatching"), 
                {createdAt: matchedAt}
            );
            const firstMatchingDocId = docRef1.id

            const mySnap = await getDoc(doc(db.db, "users", myUid));
            const counterSnap = await getDoc(doc(db.db, "users", counterUid));

            if (mySnap.exists()) {
                const myData = mySnap.data();
                const myTargetCollection = myData.sex === '남성' ? 'MaleUser' : 'FemaleUser';
                await setDoc(
                    doc(db.db, "FirstMatching", firstMatchingDocId, myTargetCollection, mySnap.id),
                    myData
                );
            }

            if (counterSnap.exists()) {
                const counterData = counterSnap.data();
                const counterTargetCollection = counterData.sex === '남성' ? 'MaleUser' : 'FemaleUser';
                await setDoc(
                    doc(db.db, "FirstMatching", firstMatchingDocId, counterTargetCollection, counterSnap.id),
                    counterData
                );
            }

            // 4. users 하위 FirstMatching에도 양방향 저장 (신규 방식)
            if (mySnap.exists() && counterSnap.exists()) {
                const myData = { ...mySnap.data(), id: mySnap.id };
                const counterData = { ...counterSnap.data(), id: counterSnap.id };

                await Promise.all([
                    setDoc(
                        doc(db.db, "users", myUid, "FirstMatching", counterUid),
                        {
                            ...counterData,
                            matchedAt,
                            matchId: firstMatchingDocId,
                        }
                    ),
                    setDoc(
                        doc(db.db, "users", counterUid, "FirstMatching", myUid),
                        {
                            ...myData,
                            matchedAt,
                            matchId: firstMatchingDocId,
                        }
                    ),
                ]);
            }

            var response = new MyResponse(true, true, "요청이 성공적으로 처리되었습니다.");
            return response;
        } catch (error) {
            // console.log(error.message)
            var response = new MyResponse(false, false, "매칭 생성 실패.")
            return response
        }
        
    }

    async declineIncomingMatch(myUid, applicantUid) {
        try {
            const incomingRef = doc(db.db, 'users', myUid, 'InCounterChosenFromAdminSuggestList', applicantUid);
            const incomingSnap = await getDoc(incomingRef);
            const applicantSnapshot = incomingSnap.exists() ? incomingSnap.data() : null;

            await updateDoc(doc(db.db, 'users', myUid), {
                declinedUsers: arrayUnion(applicantUid),
            });
            await deleteDoc(doc(db.db, 'users', myUid, 'AdminSuggestList', applicantUid));
            await deleteDoc(doc(db.db, 'users', myUid, 'ChosenFromAdminSuggestList', applicantUid));
            await deleteDoc(incomingRef);

            await deleteDoc(doc(db.db, 'users', applicantUid, 'ChosenFromAdminSuggestList', myUid));

            await markRecommendHistoryRejectedByCounterpart(applicantUid, myUid);
            await createDeclineHistory(myUid, applicantUid, applicantSnapshot);

            var response = new MyResponse(true, true, '요청이 성공적으로 처리되었습니다.');
            return response;
        } catch (error) {
            var response = new MyResponse(false, false, '네트워크 오류입니다. 다시 시도하거나, 관리자에게 문의해주세요.');
            return response;
        }
    }
}