import { MyResponse } from "../models/MyResponse"

export default class AcceptMatchUseCase(myUid, counterUid) {
    async function acceptMatch() {
        // 1. deleteCounterInMySelectedFromSuggestList
        await deleteDoc(doc(db, "users", myUid, "", counterUid));
        // 2. deleteMeInCounterChoseFromSuggestList
        await deleteDoc(doc(db, "users", this.currentUserId, "shoppingList", uid));
        // 3. createUsersInFirstMatchingList
        await deleteDoc(doc(db, "users", this.currentUserId, "shoppingList", uid));
    }
}