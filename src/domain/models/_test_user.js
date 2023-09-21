export default class TestUser {
  constructor(name, phoneNum) {
    this.name = name;
    this.phoneNum = phoneNum;
  }
  toObject() {
    return {
      name: this.name,
      phoneNum: this.phoneNum,
    };
  }
}
  