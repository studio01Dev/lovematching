import { createSlice } from '@reduxjs/toolkit'

export const emptyInquiry = {
    value: {
        // form-1: basic: null, job: null, work
        name: null,
        phoneNum: null,
        sex: null,
        yearOfBirth: null,
        birthMonth: null,
        birthDay: null,
        birthHour: null,
        birthMinute: null,
        birthCalendarType: null,
        saju: false,
        income: null,
        academicCareer: null,
        company: null,
        job: null,
        jobDetail: null,
        howWork: null,
        height: null,
        bodyType: null,
        style: null,
        // form-2: appearance: null, region: null, asset: null, life style
        residence: null,
        workPlace: null,
        haveCar: null,
        haveHouse: null,
        drinkingFrequency: null,
        smoking: null,
        tattoo: null,
        religion: null,
        // form-3: personality: null, photo
        mbti: null,
        strength: null,
        interest: null,
        dateType: null,
        faceImageUrl: null,
        bodyImageUrl: null,
        employImageUrl: null,
        // form-4: counterpart
        counterpartAge: null,
        counterpartAcademic: null,
        counterpartJob: null,
        counterpartIncome: null,
        counterpartHowWork: null,
        counterpartHeight: null,
        counterpartBodyType: null,
        counterpartStyle: null,
        counterpartResidence: null,
        counterpartHaveCar: null,
        counterpartHaveHouse: null,
        counterpartDrinkingFrequency: null,
        counterpartSmoking: null,
        counterpartTattoo: null,
        counterpartReligion: null,
        counterpartStrength: null,
        consultingType: null,
        // service
        isMatched: false,
        createdAt: null,
        paymentStatus: false,
        firstSignUpStatus: false,
        blackConsumerStatus: false,
        code: null,
    }
}

const initialState = emptyInquiry

export const inputSlice = createSlice({
    name: 'input',
    initialState: null,
    reducers: {
        applyInput: (state, action) => {
            state.value = action.payload
        },
        resetInput: () => initialState
    }
})

export const { applyInput, resetInput } = inputSlice.actions
export default inputSlice.reducer
