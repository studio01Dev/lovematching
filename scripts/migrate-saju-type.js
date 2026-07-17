/**
 * users 컬렉션의 saju 필드 마이그레이션 (boolean -> string)
 *
 * 안전 보장:
 * - dry-run 모드를 지원하여 실제 데이터 변경 전에 점검 가능
 *
 * 사용법:
 * 1) dry-run (기본):  node scripts/migrate-saju-type.js
 * 2) 실제 실행:       node scripts/migrate-saju-type.js --write
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
  console.log('users.saju 필드 마이그레이션 (boolean -> string)');
  console.log(`모드: ${WRITE ? 'WRITE (실제 저장)' : 'DRY-RUN (저장 안 함)'}`);
  console.log('========================================\n');

  const usersSnapshot = await db.collection('users').get();
  console.log(`전체 유저 문서 수: ${usersSnapshot.size}\n`);

  let totalUpdated = 0;
  let alreadyCorrect = 0;
  let sajuToSaju = 0;
  let normalToNormal = 0;
  const errors = [];

  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    const userData = userDoc.data() || {};
    const originalSaju = userData.saju;

    // 변환 로직
    let targetSaju = 'normal';
    if (originalSaju === true || originalSaju === 'true' || originalSaju === 'saju') {
      targetSaju = 'saju';
    } else if (originalSaju === 'both' || originalSaju === '일반+사주') {
      targetSaju = 'both';
    } else {
      targetSaju = 'normal';
    }

    // 이미 올바른 상태인지 확인
    if (originalSaju === targetSaju) {
      alreadyCorrect += 1;
      continue;
    }

    totalUpdated += 1;
    if (targetSaju === 'saju') sajuToSaju += 1;
    if (targetSaju === 'normal') normalToNormal += 1;

    console.log(`[변경 대상] 유저 ID: ${userId} (${userData.name || '이름 없음'})`);
    console.log(`  이전: ${JSON.stringify(originalSaju)} -> 변경: "${targetSaju}"`);

    if (!WRITE) {
      continue;
    }

    try {
      await userDoc.ref.update({ saju: targetSaju });
    } catch (error) {
      errors.push({ userId, message: error.message });
      console.error(`  [error] ${error.message}`);
    }
  }

  console.log('\n========================================');
  console.log(`전체 유저 문서: ${usersSnapshot.size}`);
  console.log(`이미 정상 데이터: ${alreadyCorrect}`);
  console.log(`변경 필요한(또는 변경된) 문서: ${totalUpdated} (사주로 변경: ${sajuToSaju}, 일반으로 변경: ${normalToNormal})`);
  
  if (WRITE) {
    console.log(`실제 업데이트 성공: ${totalUpdated - errors.length}`);
    console.log(`에러 횟수: ${errors.length}`);
  } else {
    console.log('DRY-RUN 이므로 아무 것도 저장하지 않았습니다.');
    console.log('실제 저장하려면 다음 명령어를 실행하세요: node scripts/migrate-saju-type.js --write');
  }
  console.log('========================================');

  if (errors.length > 0) {
    process.exit(1);
  }
}

migrate().catch((error) => {
  console.error(error);
  process.exit(1);
});
