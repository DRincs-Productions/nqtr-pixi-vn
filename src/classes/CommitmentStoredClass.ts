import { StoredClassModel } from "@drincs/pixi-vn"
import { CommitmentBaseInternalInterface } from "../interface/CommitmentInterface"

const COMMITMENT_CATEGORY = "__nqtr-commitment__"
export default class CommitmentStoredClass extends StoredClassModel implements CommitmentBaseInternalInterface {
    constructor(id: string,) {
        super(COMMITMENT_CATEGORY, id)
    }
}
