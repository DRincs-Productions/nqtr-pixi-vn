import { StoredClassModel } from "@drincs/pixi-vn";

const ACTIVITY_PREFIX = "__NQTR-Activity__"

export interface ActivityBaseModelProps {
}

export default class ActivityBaseModel extends StoredClassModel {
    constructor(id: string, props: ActivityBaseModelProps) {
        super(ACTIVITY_PREFIX + id)
    }
}
