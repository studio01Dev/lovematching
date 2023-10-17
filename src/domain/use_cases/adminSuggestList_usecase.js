import MyResponse from "../models/MyResponse"
import { getDocs, collection, setDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import db from '../../firebase/index';

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

    async suggestMatch(myUid, counterUid) {
        try {
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
}