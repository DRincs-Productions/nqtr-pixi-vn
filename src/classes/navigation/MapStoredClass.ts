import { StoredClassModel } from "@drincs/pixi-vn"

const MAP_CATEGORY = "__nqtr-map__"
export default class MapStoredClass extends StoredClassModel {
    constructor(id: string) {
        super(MAP_CATEGORY, id)
    }
}
