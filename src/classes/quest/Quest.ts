import { StoredClassModel } from "@drincs/pixi-vn";

const QUEST_PREFIX = "__NQTR-Quest__"

export interface QuestBaseModelProps {
}

export default class QuestBaseModel extends StoredClassModel {
    constructor(id: string, props: QuestBaseModelProps) {
        super(QUEST_PREFIX + id)
    }
}
