import { StoredClassModel } from "@drincs/pixi-vn"

const LOCATION_CATEGORY = "__nqtr-location__"
export default class LocationStoredClass extends StoredClassModel {
    constructor(id: string) {
        super(LOCATION_CATEGORY, id)
    }
}
