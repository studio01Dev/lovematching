import MyResponse from "../models/MyResponse"
import { getDocs, collection } from 'firebase/firestore';
import db from '../../firebase/index';

export default class AdminSuggestListUseCase {

    async readAdminSuggestList(uid) {
        try {
            const userList = []
            const querySnapshot = await getDocs(collection(db.db, "WareHouseOne", uid, "AdminSuggestList"))
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
        // 1. deleteCounterInMySuggestList
        // 2. deleteMeInCounterSuggestList
        // 3. createCounterInMySuggestMatchList
        // 4. createMeInCounterReciveMatchList
    }
}