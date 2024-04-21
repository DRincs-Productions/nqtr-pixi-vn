import { StoredClassModel } from "@drincs/pixi-vn";

const COMMITMENT_PREFIX = "__NQTR-Commitment__"

export interface CommitmentBaseModelProps {
}

export default class CommitmentBaseModel extends StoredClassModel {
    constructor(id: string, props: CommitmentBaseModelProps) {
        super(COMMITMENT_PREFIX + id)
    }
}
