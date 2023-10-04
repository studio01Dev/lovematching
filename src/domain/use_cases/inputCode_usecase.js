/* eslint-disable no-redeclare */
import MyResponse from "../models/MyResponse"
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import db from '../../firebase/index';

export default class InputCodeUseCase {

    async validateUser(phoneNum) {
        try {
            // 1. check user exist
            // 2. if true, check consulting end time
            // 3. if consulting doesn't finish, read user
            const q = query(collection(db.db, 'users'), where("phoneNum", "==", phoneNum))
            const querySnapshot = await getDocs(q)
            let users = []
            querySnapshot.forEach((doc) => {
                delete doc.data().id
                users.unshift({
                ...doc.data(),
                id: doc.id,
                })
            })
            if(querySnapshot.size===0) {
                var response = new MyResponse(true, 'absence', "존재하지 않는 유저입니다.")
                return response
            } else {
                console.log(users[0].consultingEndTime.toDate() > Date.now())
                if(users[0].consultingEndTime.toDate() > Date.now()) {
                    var response = new MyResponse(true, users[0].id, "접속 허가")
                    return response
                } else {
                    var response = new MyResponse(true, 'not-consulting-time', "상담 시간이 아닙니다.")
                    return response
                }
            }
        } catch(error) {
            console.log(error.message)
            var response = new MyResponse(false, false, "네트워크 오류입니다. 다시 시도하거나, 관리자에게 문의해주세요.")
            return response
        }
    }
}