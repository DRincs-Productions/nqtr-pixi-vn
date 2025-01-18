import { getRoomsByLocation } from "../../decorators/RoomDecorator"
import { ActivityInterface, MapInterface, RoomInterface } from "../../interface"
import LocationBaseInterface from "../../interface/navigation/LocationInterface"
import NavigationAbstractClass from "./NavigationAbstractClass"

const LOCATION_CATEGORY = "__nqtr-location__"
export default class LocationStoredClass extends NavigationAbstractClass implements LocationBaseInterface {
    constructor(
        id: string,
        /**
         * The map where the location is.
         */
        private readonly _map: MapInterface,
        activities: ActivityInterface[] = []
    ) {
        super(LOCATION_CATEGORY, id, activities)
    }

    get map(): MapInterface {
        return this._map
    }

    get rooms(): RoomInterface[] {
        return getRoomsByLocation(this)
    }
}
