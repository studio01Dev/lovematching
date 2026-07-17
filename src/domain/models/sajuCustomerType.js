/** Firestore `users.saju` 고객 유형 (기존 boolean과 호환) */
export const SAJU_CUSTOMER_TYPE = {
    NORMAL: 'normal',
    SAJU: 'saju',
    BOTH: 'both',
};

export const SAJU_CUSTOMER_TYPE_LABEL = {
    [SAJU_CUSTOMER_TYPE.NORMAL]: '일반',
    [SAJU_CUSTOMER_TYPE.SAJU]: '사주',
    [SAJU_CUSTOMER_TYPE.BOTH]: '일반+사주',
};

/**
 * @param {unknown} value
 * @returns {'normal' | 'saju' | 'both'}
 */
export function normalizeSajuCustomerType(value) {
    if (value === true || value === 'true' || value === SAJU_CUSTOMER_TYPE.SAJU) {
        return SAJU_CUSTOMER_TYPE.SAJU;
    }
    if (
        value === SAJU_CUSTOMER_TYPE.BOTH
        || value === '일반+사주'
        || value === 'both'
    ) {
        return SAJU_CUSTOMER_TYPE.BOTH;
    }
    return SAJU_CUSTOMER_TYPE.NORMAL;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
export function getSajuCustomerTypeLabel(value) {
    return SAJU_CUSTOMER_TYPE_LABEL[normalizeSajuCustomerType(value)];
}

/**
 * 사주 관련 고객인지 (사주 / 일반+사주)
 * @param {unknown} value
 */
export function isSajuRelatedCustomer(value) {
    const type = normalizeSajuCustomerType(value);
    return type === SAJU_CUSTOMER_TYPE.SAJU || type === SAJU_CUSTOMER_TYPE.BOTH;
}
