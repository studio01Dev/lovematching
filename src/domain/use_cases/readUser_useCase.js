/* eslint-disable no-redeclare */
import MyResponse from "../models/MyResponse"
import { getDoc, doc } from 'firebase/firestore';
import db from '../../firebase/index';

export default class ReadUserUseCase {

    async readUser(uid) {
        try {
            const docRef = doc(db.db, "users", uid)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                var response = new MyResponse(true, docSnap.data(), "유저 읽기 성공")
                return response
            } else {
                var response = new MyResponse(false, false, "존재하지 않는 유저입니다.")
                return response
            }
        } catch(error) {
            var response = new MyResponse(false, false, "네트워크 오류입니다. 다시 시도하거나, 관리자에게 문의해주세요.")
            return response
        }
    }
}