import { StoredClassModel } from "@drincs/pixi-vn"

const ROOM_CATEGORY = "__nqtr-room__"
export default class RoomStoredClass extends StoredClassModel {
    constructor(id: string) {
        super(ROOM_CATEGORY, id)
    }
}
