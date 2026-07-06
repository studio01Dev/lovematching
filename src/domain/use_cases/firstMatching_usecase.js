import MyResponse from '../models/MyResponse';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import db from '../../firebase/index';

export default class FirstMatchingUseCase {
    async readMatchedUsers(uid) {
        try {
            const matchedUsers = [];
            const matchSnapshot = await getDocs(collection(db.db, 'FirstMatching'));

            for (const matchDoc of matchSnapshot.docs) {
                const matchId = matchDoc.id;
                const matchData = matchDoc.data();
                const maleUserRef = doc(db.db, 'FirstMatching', matchId, 'MaleUser', uid);
                const femaleUserRef = doc(db.db, 'FirstMatching', matchId, 'FemaleUser', uid);

                const [maleSnap, femaleSnap] = await Promise.all([
                    getDoc(maleUserRef),
                    getDoc(femaleUserRef),
                ]);

                if (maleSnap.exists()) {
                    const counterparts = await getDocs(collection(db.db, 'FirstMatching', matchId, 'FemaleUser'));
                    counterparts.forEach((counterDoc) => {
                        matchedUsers.push({
                            ...counterDoc.data(),
                            id: counterDoc.id,
                            matchId,
                            matchedAt: matchData.createdAt,
                        });
                    });
                } else if (femaleSnap.exists()) {
                    const counterparts = await getDocs(collection(db.db, 'FirstMatching', matchId, 'MaleUser'));
                    counterparts.forEach((counterDoc) => {
                        matchedUsers.push({
                            ...counterDoc.data(),
                            id: counterDoc.id,
                            matchId,
                            matchedAt: matchData.createdAt,
                        });
                    });
                }
            }

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
