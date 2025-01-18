import { StoredClassModel } from "@drincs/pixi-vn"
import { ActivityBaseInternalInterface } from "../interface/ActivityInterface"

const ACTIVITY_CATEGORY = "__nqtr-Activity__"
export default class ActivityStoredClass extends StoredClassModel implements ActivityBaseInternalInterface {
    constructor(id: string,) {
        super(ACTIVITY_CATEGORY, id)
    }
}
