export default class TestUser {
    constructor(name) {
      this.name = name;
    }
    toObject() {
      return {
        name: this.name,
      };
    }
  }
  