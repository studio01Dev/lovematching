/**
 * declinedUsers 배열 기반 거절 이력 동기화 스크립트
 * 
 * 안전 보장:
 * - 기본적으로 READ ONLY (Dry-run) 모드로 작동
 * - --write 옵션을 전달했을 때만 실제 쓰기 작업 수행
 * 
 * 사용법:
 * 1) Dry-run:  node scripts/sync-declined-users.js
 * 2) 실제 저장: node scripts/sync-declined-users.js --write
 */

const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const WRITE = process.argv.includes('--write');
const SERVICE_ACCOUNT_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS
  || path.join(__dirname, '..', 'serviceAccount.json');

function loadServiceAccount() {
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`서비스 계정 파일이 없습니다: ${SERVICE_ACCOUNT_PATH}`);
    console.error('Firebase Console에서 비공개 키를 받아 serviceAccount.json 으로 저장하세요.');
    process.exit(1);
  }
  return require(SERVICE_ACCOUNT_PATH);
}

function initAdmin() {
  const serviceAccount = loadServiceAccount();
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
  return getFirestore();
}

async function run() {
  const db = initAdmin();

  console.log('========================================');
  console.log('declinedUsers 기반 거절 이력 역방향 동기화');
  console.log(`모드: ${WRITE ? 'WRITE (실제 저장)' : 'DRY-RUN (저장 안 함)'}`);
  console.log('========================================\n');

  const usersSnapshot = await db.collection('users').get();
  console.log(`총 유저 수: ${usersSnapshot.size}\n`);

  let totalInconsistencies = 0;
  let updatedUsersCount = 0;

  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data();
    const uid = userDoc.id;
    const declinedUsers = userData.declinedUsers || [];

    if (!Array.isArray(declinedUsers) || declinedUsers.length === 0) {
      continue;
    }

    // 1. 해당 유저의 기존 DeclineHistory 목록 조회
    const declineHistorySnapshot = await db.collection('users').doc(uid).collection('DeclineHistory').get();
    const existingDeclineUids = new Set(
      declineHistorySnapshot.docs.map(doc => doc.data().counterpartUserId || doc.data().id).filter(Boolean)
    );

    // 2. 해당 유저의 기존 RecommendHistory 목록 중 'declined' 상태인 목록 조회
    const recommendHistorySnapshot = await db.collection('users').doc(uid).collection('RecommendHistory').get();
    const existingRecommendDeclinedUids = new Set(
      recommendHistorySnapshot.docs
        .filter(doc => {
          const data = doc.data();
          const status = data.resolvedStatus ?? data.status;
          return status === 'declined';
        })
        .map(doc => doc.data().counterpartUserId)
        .filter(Boolean)
    );

    // 3. declinedUsers 배열 중 두 이력 컬렉션 어디에도 거절 이력이 없는 경우를 식별
    const missingUids = [];
    for (const counterpartUid of declinedUsers) {
      if (!existingDeclineUids.has(counterpartUid) && !existingRecommendDeclinedUids.has(counterpartUid)) {
        missingUids.push(counterpartUid);
      }
    }

    if (missingUids.length > 0) {
      totalInconsistencies += missingUids.length;
      console.log(`유저 [${userData.name || '이름없음'}] (${uid}): 거절 목록 중 ${missingUids.length}명 이력 누락`);
      console.log(`  - 누락된 상대 UID: ${missingUids.join(', ')}`);

      if (WRITE) {
        for (const counterpartUid of missingUids) {
          // 상대방 프로필 정보를 가져와 이력 문서에 병합 (매니저 화면 렌더링 최적화)
          const counterpartSnap = await db.collection('users').doc(counterpartUid).get();
          const counterpartData = counterpartSnap.exists ? counterpartSnap.data() : {};

          const newDeclineRef = db.collection('users').doc(uid).collection('DeclineHistory').doc();
          await newDeclineRef.set({
            name: counterpartData.name || '',
            sex: counterpartData.sex || '',
            yearOfBirth: counterpartData.yearOfBirth || '',
            manager: counterpartData.manager || '',
            id: counterpartUid,
            counterpartUserId: counterpartUid,
            declineType: 'rejected_incoming', // "받은 신청 거절"을 기본값으로 동기화
            declinedAt: FieldValue.serverTimestamp(),
          });
          console.log(`    + [추가완료] 상대 [${counterpartData.name || '이름없음'}] (${counterpartUid})의 DeclineHistory 생성 완료`);
        }
        updatedUsersCount++;
      }
    }
  }

  console.log('\n========================================');
  console.log(`검사 완료!`);
  console.log(`발견된 누락 이력 건수: ${totalInconsistencies}건`);
  if (WRITE) {
    console.log(`실제 업데이트된 유저 수: ${updatedUsersCount}명`);
  } else {
    console.log(`* 실제로 데이터를 저장하려면 --write 옵션을 추가하여 실행하세요.`);
    console.log(`  예: node scripts/sync-declined-users.js --write`);
  }
  console.log('========================================');
}

run().catch(console.error);
