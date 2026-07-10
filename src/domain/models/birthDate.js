export function isSajuCustomer({ birthCalendarType, birthHour, birthMinute }) {
  const hasCalendarType = birthCalendarType === '양력' || birthCalendarType === '음력';
  const hasHour = isPresentBirthTimeValue(birthHour);
  const hasMinute = isPresentBirthTimeValue(birthMinute);
  return hasCalendarType || hasHour || hasMinute;
}

function isPresentBirthTimeValue(value) {
  return value !== undefined && value !== null && value !== '' && value !== 'null';
}

export function formatBirthDate({ yearOfBirth, birthMonth, birthDay, birthHour, birthMinute, birthCalendarType }) {
  if (!yearOfBirth) {
    return '';
  }

  let formatted = `${yearOfBirth}`;

  if (birthMonth && birthDay) {
    formatted = `${yearOfBirth}년 ${birthMonth}월 ${birthDay}일`;
    if (birthCalendarType) {
      formatted += ` (${birthCalendarType})`;
    }
  }

  if (isPresentBirthTimeValue(birthHour) && isPresentBirthTimeValue(birthMinute)) {
    formatted += ` ${birthHour}시 ${birthMinute}분`;
  }

  return formatted;
}

export function isValidBirthDate(yearOfBirth, birthMonth, birthDay) {
  const year = parseInt(yearOfBirth, 10);
  const month = parseInt(birthMonth, 10);
  const day = parseInt(birthDay, 10);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return false;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
