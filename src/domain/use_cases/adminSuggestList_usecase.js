import MyResponse from "../models/MyResponse"
import { getDocs, collection, setDoc, getDoc, doc, deleteDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import db from '../../firebase/index';

async function updateRecommendHistoryIfExists(myUid, counterpartUid, status) {
    const adminSuggestRef = doc(db.db, 'users', myUid, 'AdminSuggestList', counterpartUid);
    const adminSuggestSnap = await getDoc(adminSuggestRef);

    if (!adminSuggestSnap.exists()) {
        return;
    }

    const recommendHistoryId = adminSuggestSnap.data()?.recommendHistoryId;
    if (!recommendHistoryId) {
        return;
    }

    await updateDoc(doc(db.db, 'users', myUid, 'RecommendHistory', recommendHistoryId), {
        status,
        statusUpdatedAt: serverTimestamp(),
    });
}

export default class AdminSuggestListUseCase {

    async readAdminSuggestList(uid) {
        try {
            const userList = []
            const querySnapshot = await getDocs(collection(db.db, "users", uid, "AdminSuggestList"))
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

    async readChosenFromAdminSuggestList(uid) {
        try {
            const userList = []
            const querySnapshot = await getDocs(collection(db.db, "users", uid, "ChosenFromAdminSuggestList"))
            querySnapshot.forEach(
                (docSnap) => {
                    userList.push(
                        {
                            ...docSnap.data(),
                            id: docSnap.id
                        }
                    )
                }
            )
            var response = new MyResponse(true, userList, "요청이 성공적으로 처리되었습니다.");
            return response;
        } catch (error) {
            var response = new MyResponse(false, false, "네트워크 오류입니다. 다시 시도하거나, 관리자에게 문의해주세요.")
            return response
        }
    }

    async suggestMatch(myUid, counterUid) {
        try {
            await updateRecommendHistoryIfExists(myUid, counterUid, 'accepted');

            // 1. delete counter in my AdminSuggestList
            await deleteDoc(doc(db.db, "users", myUid, "AdminSuggestList", counterUid));
            // 2. delete me in counter InCounterAdminSuggestList
            await deleteDoc(doc(db.db, "users", counterUid, "InCounterAdminSuggestList", myUid));
            // 3. create counter in my ChosenFromAdminSuggestList
            const docRef1 = doc(db.db, "users", counterUid)
            const docSnap1 = await getDoc(docRef1);
            if(docSnap1.exists()) {
                const docRef2 = doc(collection(db.db, "users", myUid, "ChosenFromAdminSuggestList"), counterUid)
                await setDoc(
                    docRef2, docSnap1.data()
                )
            } else {
                // console.log("No such document!");
            }
            // 4. create me in counter InCounterChosenFromAdminSuggestList
            const docRef3 = doc(db.db, "users", myUid)
            const docSnap2 = await getDoc(docRef3);
            if(docSnap2.exists()) {
                const docRef4 = doc(collection(db.db, "users", counterUid, "InCounterChosenFromAdminSuggestList"), myUid)
                await setDoc(
                    docRef4, docSnap2.data()
                );
            } else {
                // console.log("No such document!");
            }
            var response = new MyResponse(true, true, "요청이 성공적으로 처리되었습니다.");
            return response;
        } catch(error) {
            var response = new MyResponse(false, false, "네트워크 오류입니다. 다시 시도하거나, 관리자에게 문의해주세요.")
            return response
        }
    }

    async declineSuggest(myUid, counterUid) {
        try {
            await updateDoc(doc(db.db, "users", myUid), {
                declinedUsers: arrayUnion(counterUid),
            });
            await updateRecommendHistoryIfExists(myUid, counterUid, 'declined');
            await deleteDoc(doc(db.db, "users", myUid, "AdminSuggestList", counterUid));
            await deleteDoc(doc(db.db, "users", myUid, "ChosenFromAdminSuggestList", counterUid));
            await deleteDoc(doc(db.db, "users", myUid, "InCounterChosenFromAdminSuggestList", counterUid));

            var response = new MyResponse(true, true, "요청이 성공적으로 처리되었습니다.");
            return response;
        } catch (error) {
            var response = new MyResponse(false, false, "네트워크 오류입니다. 다시 시도하거나, 관리자에게 문의해주세요.")
            return response
        }
    }
}