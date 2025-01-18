import { StoredClassModel } from "@drincs/pixi-vn"
import { getLocationsByMap } from "../../decorators/RoomDecorator"
import { LocationInterface } from "../../interface"
import { MapBaseInternalInterface } from "../../interface/navigation/MapInterface"

const MAP_CATEGORY = "__nqtr-map__"
export default class MapStoredClass extends StoredClassModel implements MapBaseInternalInterface {
    constructor(id: string) {
        super(MAP_CATEGORY, id)
    }

    get locations(): LocationInterface[] {
        return getLocationsByMap(this)
    }
}
