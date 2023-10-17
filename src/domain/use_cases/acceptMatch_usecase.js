import MyResponse from "../models/MyResponse"
import { getDocs, collection, getDoc, setDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
import db from '../../firebase/index';

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

            // 3. create Pair in FirstMatching

            // create basic doc
            var firstMatchingDocId
            const docRef1 = await addDoc(collection(db.db, "FirstMatching"), 
                {createdAt: new Date()}
            );
            firstMatchingDocId = docRef1.id
            // console.log("Document written with ID: ", firstMatchingDocId);

            // create me in FirstMatching
            const docRef2 = doc(db.db, "users", myUid)
            const docSnap1 = await getDoc(docRef2);
            if(docSnap1.exists()) {
                if(docSnap1.data().sex == '남성') {
                    const docRef3 = doc(collection(db.db, "FirstMatching", firstMatchingDocId, "MaleUser"), docSnap1.id)
                    await setDoc(
                        docRef3, docSnap1.data()
                    )
                } else {
                    const docRef3 = doc(collection(db.db, "FirstMatching", firstMatchingDocId, "FemaleUser"), docSnap1.id)
                    await setDoc(
                        docRef3, docSnap1.data()
                    )
                }
            } else {
                // console.log("No such document!");
            }

            // create counter in FirstMatching
            const docRef4 = doc(db.db, "users", counterUid)
            const docSnap2 = await getDoc(docRef4);
            if(docSnap2.exists()) {
                if(docSnap2.data().sex == '남성') {
                    const docRef5 = doc(collection(db.db, "FirstMatching", firstMatchingDocId, "MaleUser"), docSnap2.id)
                    await setDoc(
                        docRef5, docSnap2.data()
                    )
                } else {
                    const docRef5 = doc(collection(db.db, "FirstMatching", firstMatchingDocId, "FemaleUser"), docSnap2.id)
                    await setDoc(
                        docRef5, docSnap2.data()
                    )
                }
            } else {
                // console.log("No such document!");
            }
            var response = new MyResponse(true, true, "요청이 성공적으로 처리되었습니다.");
            return response;
        } catch (error) {
            // console.log(error.message)
            var response = new MyResponse(false, false, "매칭 생성 실패.")
            return response
        }
        
    }
}