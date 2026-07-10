import MyResponse from '../models/MyResponse';
import { getDocs, collection } from 'firebase/firestore';
import db from '../../firebase/index';

export default class FirstMatchingUseCase {
    async readMatchedUsers(uid) {
        try {
            const matchedUsers = [];
            const querySnapshot = await getDocs(collection(db.db, 'users', uid, 'FirstMatching'));

            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                matchedUsers.push({
                    ...data,
                    id: docSnap.id,
                    matchId: data.matchId ?? docSnap.id,
                    matchedAt: data.matchedAt ?? null,
                });
            });

            matchedUsers.sort((a, b) => {
                const aTime = a.matchedAt?.toMillis?.() ?? (a.matchedAt instanceof Date ? a.matchedAt.getTime() : 0);
                const bTime = b.matchedAt?.toMillis?.() ?? (b.matchedAt instanceof Date ? b.matchedAt.getTime() : 0);
                return bTime - aTime;
            });

            return new MyResponse(true, matchedUsers, '요청이 성공적으로 처리되었습니다.');
        } catch (error) {
            return new MyResponse(false, false, '네트워크 오류입니다. 다시 시도하거나, 관리자에게 문의해주세요.');
        }
    }
}
