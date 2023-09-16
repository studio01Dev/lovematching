export default class User {
    constructor(
        name,
        phoneNum,
        sex,
        yearOfBirth,
        academicCareer,
        job,
        income,
        company,
        jobDetail,
        howWork,
        height,
        bodyType,
        style,
        residence,
        workPlace,
        haveCar,
        haveHouse,
        drinkingFrequency,
        smoking,
        tattoo,
        religion,
        mbti,
        strength,
        interest,
        dateType,
        faceImageUrl,
        bodyImageUrl,
        employImageUrl,
        counterpartMaxAge,
        counterpartMinAge,
        counterpartCheckSameAge,
        counterpartAcademic,
        counterpartJob,
        counterpartIncome,
        counterpartHowWork,
        counterpartHeight,
        counterpartBodyType,
        counterpartStyle,
        counterpartHaveCar,
        counterpartHaveHouse,
        counterpartDrinkingFrequency,
        counterpartSmoking,
        counterpartTattoo,
        counterpartReligion,
        consultingType
    ) {
        this.name = name;
        this.phoneNum = phoneNum;
        this.sex = sex;
        this.yearOfBirth = yearOfBirth;
        this.academicCareer = academicCareer;
        this.job = job;
        this.income = income;
        this.company = company;
        this.jobDetail = jobDetail;
        this.howWork = howWork;
        this.height = height;
        this.bodyType = bodyType;
        this.style = style;
        this.residence = residence;
        this.workPlace = workPlace;
        this.haveCar = haveCar;
        this.haveHouse = haveHouse;
        this.drinkingFrequency = drinkingFrequency;
        this.smoking = smoking;
        this.tattoo = tattoo;
        this.religion = religion;
        this.mbti = mbti;
        this.strength = strength;
        this.interest = interest;
        this.dateType = dateType;
        this.faceImageUrl = faceImageUrl;
        this.bodyImageUrl = bodyImageUrl;
        this.employImageUrl = employImageUrl;
        this.counterpartMaxAge = counterpartMaxAge;
        this.counterpartMinAge = counterpartMinAge;
        this.counterpartCheckSameAge = counterpartCheckSameAge;
        this.counterpartAcademic = counterpartAcademic;
        this.counterpartJob = counterpartJob;
        this.counterpartIncome = counterpartIncome;
        this.counterpartHowWork = counterpartHowWork;
        this.counterpartHeight = counterpartHeight;
        this.counterpartBodyType = counterpartBodyType;
        this.counterpartStyle = counterpartStyle;
        this.counterpartHaveCar = counterpartHaveCar;
        this.counterpartHaveHouse = counterpartHaveHouse;
        this.counterpartDrinkingFrequency = counterpartDrinkingFrequency;
        this.counterpartSmoking = counterpartSmoking;
        this.counterpartTattoo = counterpartTattoo;
        this.counterpartReligion = counterpartReligion;
        this.consultingType = consultingType;
    }
    toObject() {
        return {
            name: this.name,
            phoneNum: this.phoneNum,
            sex: this.sex,
            yearOfBirth: this.yearOfBirth,
            academicCareer: this.academicCareer,
            job: this.job,
            income: this.income,
            company: this.company,
            jobDetail: this.jobDetail,
            howWork: this.howWork,
            height: this.height,
            bodyType: this.bodyType,
            style: this.style,
            residence: this.residence,
            workPlace: this.workPlace,
            haveCar: this.haveCar,
            haveHouse: this.haveHouse,
            drinkingFrequency: this.drinkingFrequency,
            smoking: this.smoking,
            tattoo: this.tattoo,
            religion: this.religion,
            mbti: this.mbti,
            strength: this.strength,
            interest: this.interest,
            dateType: this.dateType,
            faceImageUrl: this.faceImageUrl,
            bodyImageUrl: this.bodyImageUrl,
            employImageUrl: this.employImageUrl,
            counterpartMaxAge: this.counterpartMaxAge,
            counterpartMinAge: this.counterpartMinAge,
            counterpartCheckSameAge: this.counterpartCheckSameAge,
            counterpartAcademic: this.counterpartAcademic,
            counterpartJob: this.counterpartJob,
            counterpartIncome: this.counterpartIncome,
            counterpartHowWork: this.counterpartHowWork,
            counterpartHeight: this.counterpartHeight,
            counterpartBodyType: this.counterpartBodyType,
            counterpartStyle: this.counterpartStyle,
            counterpartHaveCar: this.counterpartHaveCar,
            counterpartHaveHouse: this.counterpartHaveHouse,
            counterpartDrinkingFrequency: this.counterpartDrinkingFrequency,
            counterpartSmoking: this.counterpartSmoking,
            counterpartTattoo: this.counterpartTattoo,
            counterpartReligion: this.counterpartReligion,
            consultingType: this.consultingType
        };
    }
}