/**
 * FirstMatching → users/{uid}/FirstMatching/{counterpartUid} 마이그레이션
 *
 * 안전 보장:
 * - 기존 FirstMatching 컬렉션은 READ ONLY (수정/삭제 없음)
 * - 쓰기는 users/{uid}/FirstMatching 에만 수행
 *
 * 사용법:
 * 1) Firebase Console → 프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성
 * 2) 다운로드한 JSON을 프로젝트 루트에 serviceAccount.json 으로 저장
 * 3) dry-run (기본):  node scripts/migrate-first-matching.js
 * 4) 실제 실행:       node scripts/migrate-first-matching.js --write
 */

const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

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

async function migrate() {
  const db = initAdmin();

  console.log('========================================');
  console.log('FirstMatching → users/*/FirstMatching');
  console.log(`모드: ${WRITE ? 'WRITE (실제 저장)' : 'DRY-RUN (저장 안 함)'}`);
  console.log('기존 FirstMatching: READ ONLY (수정/삭제 없음)');
  console.log('========================================\n');

  const matchSnapshot = await db.collection('FirstMatching').get();
  console.log(`FirstMatching 문서 수: ${matchSnapshot.size}\n`);

  let pairCount = 0;
  let writeCount = 0;
  let skipIncomplete = 0;
  const errors = [];

  for (const matchDoc of matchSnapshot.docs) {
    const matchId = matchDoc.id;
    const matchData = matchDoc.data() || {};
    const matchedAt = matchData.createdAt ?? null;

    const [maleSnap, femaleSnap] = await Promise.all([
      matchDoc.ref.collection('MaleUser').get(),
      matchDoc.ref.collection('FemaleUser').get(),
    ]);

    if (maleSnap.empty || femaleSnap.empty) {
      skipIncomplete += 1;
      console.warn(`[skip] ${matchId}: MaleUser=${maleSnap.size}, FemaleUser=${femaleSnap.size}`);
      continue;
    }

    for (const maleDoc of maleSnap.docs) {
      for (const femaleDoc of femaleSnap.docs) {
        pairCount += 1;

        const maleData = { ...maleDoc.data(), id: maleDoc.id };
        const femaleData = { ...femaleDoc.data(), id: femaleDoc.id };

        const maleSidePayload = {
          ...femaleData,
          matchedAt,
          matchId,
        };
        const femaleSidePayload = {
          ...maleData,
          matchedAt,
          matchId,
        };

        const maleTarget = `users/${maleDoc.id}/FirstMatching/${femaleDoc.id}`;
        const femaleTarget = `users/${femaleDoc.id}/FirstMatching/${maleDoc.id}`;

        console.log(`[pair] ${matchId}`);
        console.log(`  → ${maleTarget}`);
        console.log(`  → ${femaleTarget}`);

        if (!WRITE) {
          continue;
        }

        try {
          // 기존 FirstMatching 은 절대 건드리지 않음. users 하위만 set.
          await Promise.all([
            db.doc(maleTarget).set(maleSidePayload, { merge: true }),
            db.doc(femaleTarget).set(femaleSidePayload, { merge: true }),
          ]);
          writeCount += 2;
        } catch (error) {
          errors.push({ matchId, maleTarget, femaleTarget, message: error.message });
          console.error(`  [error] ${error.message}`);
        }
      }
    }
  }

  console.log('\n========================================');
  console.log(`매칭 문서: ${matchSnapshot.size}`);
  console.log(`생성 대상 페어: ${pairCount}`);
  console.log(`불완전 스킵: ${skipIncomplete}`);
  if (WRITE) {
    console.log(`users 하위 쓰기 횟수: ${writeCount}`);
    console.log(`에러: ${errors.length}`);
  } else {
    console.log('DRY-RUN 이므로 아무 것도 저장하지 않았습니다.');
    console.log('실제 저장: node scripts/migrate-first-matching.js --write');
  }
  console.log('기존 FirstMatching 컬렉션은 변경되지 않았습니다.');
  console.log('========================================');

  if (errors.length > 0) {
    process.exit(1);
  }
}

migrate().catch((error) => {
  console.error(error);
  process.exit(1);
});
