import { StoredClassModel } from "@drincs/pixi-vn";

const STAGE_PREFIX = "__NQTR-Quest__"

export interface StageBaseModelProps {
}

export default class StageBaseModel extends StoredClassModel {
    constructor(id: string, props: StageBaseModelProps) {
        super(STAGE_PREFIX + id)
    }
}
