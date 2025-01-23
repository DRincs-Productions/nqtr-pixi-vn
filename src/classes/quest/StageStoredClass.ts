import { StoredClassModel } from "@drincs/pixi-vn"

const STAGE_CATEGORY = "__nqtr-stage__"
export default class StageStoredClass extends StoredClassModel implements StageBaseInternalInterface {
    constructor(
        id: string,
    ) {
        super(STAGE_CATEGORY, id)
    }
}
