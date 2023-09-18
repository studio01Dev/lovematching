import { MyResponse } from "../models/MyResponse"

export default class ReadSuggestListUseCase(uid) {
    // 1. readMySuggestList
    var response = new MyResponse(true, userList, "요청이 성공적으로 처리되었습니다.");
    return response;
}