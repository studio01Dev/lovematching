import { charm } from '../models/questionnaires';

export const TEST_FORM_FIXTURES = {
  1: {
    name: '테스트유저',
    phoneNum: '01099998888',
    sex: '남성',
    yearOfBirth: '1995',
    birthMonth: '3',
    birthDay: '15',
    birthCalendarType: '양력',
    income: 5000,
    academicCareer: '4년제대학',
    company: '테스트회사',
    job: '대기업',
    jobDetail: '개발팀 / 대리',
    howWork: '주 5일',
    height: '175',
    bodyType: '보통',
    style: ['지적임', '세련됨'],
  },
  2: {
    residence: ['서울특별시', '강남구'],
    workPlace: ['서울특별시', '서초구'],
    haveCar: '있음',
    haveHouse: '없음',
    drinkingFrequency: '월 1회 이하',
    tattoo: '없음',
    smoking: '비흡연',
    religion: '무교',
    consultingType: ['카카오톡'],
  },
  3: {
    mbti: 'ENFP',
    strength: [charm[0], charm[1], charm[2]],
    interest: '영화 감상, 요리',
    dateType: '카페에서 대화하기',
  },
  4: {},
  5: {
    counterpartAge: ['26~30'],
    counterpartAcademic: ['4년제대학'],
    counterpartJob: ['대기업'],
    counterpartIncome: ['4,001~5,000'],
    counterpartHowWork: ['주 5일'],
    counterpartHeight: ['161~165'],
    counterpartBodyType: ['보통'],
    counterpartStyle: ['지적임', '세련됨'],
    counterpartResidences: ['서울특별시', '경기도'],
    counterpartHaveCar: '있음',
    counterpartHaveHouse: '없음',
    counterpartDrinkingFrequency: ['월 1회 이하'],
    counterpartSmoking: '비흡연',
    counterpartTattoo: '없음',
    counterpartReligion: ['무교'],
    counterpartStrength: [charm[0], charm[1], charm[2]],
  },
};

export function getTestDataForPage(page) {
  return { ...(TEST_FORM_FIXTURES[page] || {}) };
}

function createTestImageFile(filename, color = '#5F63C7') {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px sans-serif';
    ctx.fillText('TEST', 70, 105);
    canvas.toBlob(
      (blob) => resolve(new File([blob], filename, { type: 'image/jpeg' })),
      'image/jpeg',
      0.9
    );
  });
}

export async function createTestImageFiles() {
  const [faceImageData, bodyImageData, employImageData] = await Promise.all([
    createTestImageFile('face-test.jpg'),
    createTestImageFile('body-test.jpg', '#7B7FD7'),
    createTestImageFile('employ-test.jpg', '#4A4E9F'),
  ]);

  return { faceImageData, bodyImageData, employImageData };
}
