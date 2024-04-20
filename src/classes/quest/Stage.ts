import { StoredClassModel } from "@drincs/pixi-vn";
import { QuestsRequiredType } from "../../types/QuestsRequired";
import Goal from "./Goal";
import QuestBaseModel from "./Quest";

const STAGE_PREFIX = "__NQTR-Stage__"

export interface StageBaseModelProps {
    quest: QuestBaseModel,
    goals?: Goal[]
    name?: string
    description?: string
    adviceDescription?: string
    image?: string
    daysRequiredToStart: number
    flagsRequired: string[]
    questsRequired: QuestsRequiredType[]
    requestDescription?: string
    onStart: () => void
    onEnd: () => void
}

export default class StageBaseModel extends StoredClassModel {
    constructor(id: string, props: StageBaseModelProps) {
        super(STAGE_PREFIX + id)
    }
}
