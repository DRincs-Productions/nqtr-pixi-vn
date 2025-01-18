import { StoredClassModel } from "@drincs/pixi-vn"
import { LocationInterface, RoomInterface } from "../../interface"

const ROOM_CATEGORY = "__nqtr-room__"
export default class RoomStoredClass extends StoredClassModel implements RoomInterface {
    constructor(
        id: string,
        /**
         * The location where the room is.
         */
        private readonly _location: LocationInterface,
    ) {
        super(ROOM_CATEGORY, id)
    }

    get location(): LocationInterface {
        return this._location
    }
}
