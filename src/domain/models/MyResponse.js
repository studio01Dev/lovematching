export default class MyResponse {
    constructor(success, data, message) {
      this.success = success;
      this.data = data;
      this.message = message;
    }
  }
  
// 예시로 객체 생성
//   var response = new MyResponse(true, { name: "John", age: 30 }, "요청이 성공적으로 처리되었습니다.");
  
  // 객체 값 출력
//   // console.log(response.success); // true
//   // console.log(response.data); // { name: "John", age: 30 }
//   // console.log(response.message); // "요청이 성공적으로 처리되었습니다."
  