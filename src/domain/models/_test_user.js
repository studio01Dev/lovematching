export default class TestUser {
  constructor(name, sex, createdAt, code) {
    this.name = name;
    this.sex = sex;
    this.createdAt = createdAt;
    this.code = code;
  }
  toObject() {
    return {
      name: this.name,
      sex: this.sex,
      createdAt: this.createdAt,
      code: this.code,
    };
  }
}
  