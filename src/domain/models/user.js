export default class User {
    constructor(
        //firebase document id
        id,
        // form-1: basic, job, work
        name,
        phoneNum,
        sex,
        yearOfBirth,
        birthMonth,
        birthDay,
        birthHour,
        birthMinute,
        birthCalendarType,
        saju,
        income,
        academicCareer,
        company,
        job,
        jobDetail,
        howWork,
        height,
        bodyType,
        style,
        // form-2: appearance, region, asset, life style
        residence,
        workPlace,
        haveCar,
        haveHouse,
        drinkingFrequency,
        smoking,
        tattoo,
        religion,
        // form-3: personality, photo
        mbti,
        strength,
        interest,
        dateType,
        faceImageUrl,
        bodyImageUrl,
        employImageUrl,
        houseProofImageUrl,
        // form-4: counterpart
        counterpartAge,
        counterpartAcademic,
        counterpartJob,
        counterpartIncome,
        counterpartHowWork,
        counterpartHeight,
        counterpartBodyType,
        counterpartStyle,
        counterpartResidence,
        counterpartResidences,
        counterpartHaveCar,
        counterpartHaveHouse,
        counterpartDrinkingFrequency,
        counterpartSmoking,
        counterpartTattoo,
        counterpartReligion,
        counterpartStrength,
        consultingType,
        // service
        isMatched,
        createdAt,
        paymentStatus,
        firstSignUpStatus,
        blackConsumerStatus,
        consultingEndTime,
        code,
    ) {
        this.id = id;
        this.name = name;
        this.phoneNum = phoneNum;
        this.sex = sex;
        this.yearOfBirth = yearOfBirth;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.birthHour = birthHour;
        this.birthMinute = birthMinute;
        this.birthCalendarType = birthCalendarType;
        this.saju = saju;
        this.income = income;
        this.academicCareer = academicCareer;
        this.company = company;
        this.job = job;
        this.jobDetail = jobDetail;
        this.howWork = howWork;
        this.height = height;
        this.bodyType = bodyType;
        this.style = style;
        //
        this.residence = residence;
        this.workPlace = workPlace;
        this.haveCar = haveCar;
        this.haveHouse = haveHouse;
        this.drinkingFrequency = drinkingFrequency;
        this.smoking = smoking;
        this.tattoo = tattoo;
        this.religion = religion;
        //
        this.mbti = mbti;
        this.strength = strength;
        this.interest = interest;
        this.dateType = dateType;
        this.faceImageUrl = faceImageUrl;
        this.bodyImageUrl = bodyImageUrl;
        this.employImageUrl = employImageUrl;
        this.houseProofImageUrl = houseProofImageUrl;
        this.counterpartAge = counterpartAge;
        this.counterpartAcademic = counterpartAcademic;
        this.counterpartJob = counterpartJob;
        this.counterpartIncome = counterpartIncome;
        this.counterpartHowWork = counterpartHowWork;
        this.counterpartHeight = counterpartHeight;
        this.counterpartBodyType = counterpartBodyType;
        this.counterpartStyle = counterpartStyle;
        this.counterpartResidence = counterpartResidence;
        this.counterpartResidences = counterpartResidences;
        this.counterpartHaveCar = counterpartHaveCar;
        this.counterpartHaveHouse = counterpartHaveHouse;
        this.counterpartDrinkingFrequency = counterpartDrinkingFrequency;
        this.counterpartSmoking = counterpartSmoking;
        this.counterpartTattoo = counterpartTattoo;
        this.counterpartReligion = counterpartReligion;
        this.counterpartStrength = counterpartStrength;
        this.consultingType = consultingType;
        //
        this.isMatched = isMatched;
        this.createdAt = createdAt;
        this.paymentStatus = paymentStatus;
        this.firstSignUpStatus = firstSignUpStatus;
        this.blackConsumerStatus = blackConsumerStatus;
        this.consultingEndTime = consultingEndTime;
        this.code = code;
    }
    toObject() {
        return {
            id: this.id,
            name: this.name,
            phoneNum: this.phoneNum,
            sex: this.sex,
            yearOfBirth: this.yearOfBirth,
            birthMonth: this.birthMonth,
            birthDay: this.birthDay,
            birthHour: this.birthHour,
            birthMinute: this.birthMinute,
            birthCalendarType: this.birthCalendarType,
            saju: this.saju,
            income: this.income,
            academicCareer: this.academicCareer,
            company: this.company,
            job: this.job,
            jobDetail: this.jobDetail,
            howWork: this.howWork,
            height: this.height,
            bodyType: this.bodyType,
            style: this.style,
            //
            residence: this.residence,
            workPlace: this.workPlace,
            haveCar: this.haveCar,
            haveHouse: this.haveHouse,
            drinkingFrequency: this.drinkingFrequency,
            smoking: this.smoking,
            tattoo: this.tattoo,
            religion: this.religion,
            //
            mbti: this.mbti,
            strength: this.strength,
            interest: this.interest,
            dateType: this.dateType,
            faceImageUrl: this.faceImageUrl,
            bodyImageUrl: this.bodyImageUrl,
            employImageUrl: this.employImageUrl,
            houseProofImageUrl: this.houseProofImageUrl,
            //
            counterpartAge: this.counterpartAge,
            counterpartAcademic: this.counterpartAcademic,
            counterpartJob: this.counterpartJob,
            counterpartIncome: this.counterpartIncome,
            counterpartHowWork: this.counterpartHowWork,
            counterpartHeight: this.counterpartHeight,
            counterpartBodyType: this.counterpartBodyType,
            counterpartStyle: this.counterpartStyle,
            counterpartResidence: this.counterpartResidence,
            counterpartResidences: this.counterpartResidences,
            counterpartHaveCar: this.counterpartHaveCar,
            counterpartHaveHouse: this.counterpartHaveHouse,
            counterpartDrinkingFrequency: this.counterpartDrinkingFrequency,
            counterpartSmoking: this.counterpartSmoking,
            counterpartTattoo: this.counterpartTattoo,
            counterpartReligion: this.counterpartReligion,
            counterpartStrength: this.counterpartStrength,
            consultingType: this.consultingType,
            //
            isMatched: this.isMatched,
            createdAt: this.createdAt,
            paymentStatus: this.paymentStatus,
            firstSignUpStatus: this.firstSignUpStatus,
            blackConsumerStatus: this.blackConsumerStatus,
            consultingEndTime: this.consultingEndTime,
            code: this.code,
        };
    }
}