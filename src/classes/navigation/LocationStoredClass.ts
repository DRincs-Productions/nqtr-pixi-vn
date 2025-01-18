import { StoredClassModel } from "@drincs/pixi-vn"
import { getRoomsByLocation } from "../../decorators/RoomDecorator"
import { MapInterface, RoomInterface } from "../../interface"
import LocationBaseInterface from "../../interface/navigation/LocationInterface"

const LOCATION_CATEGORY = "__nqtr-location__"
export default class LocationStoredClass extends StoredClassModel implements LocationBaseInterface {
    constructor(
        id: string,
        /**
         * The map where the location is.
         */
        private readonly _map: MapInterface
    ) {
        super(LOCATION_CATEGORY, id)
    }

    get map(): MapInterface {
        return this._map
    }

    get rooms(): RoomInterface[] {
        return getRoomsByLocation(this)
    }
}
