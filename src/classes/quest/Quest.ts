import { StoredClassModel } from "@drincs/pixi-vn";
import StageBaseModel from "./Stage";

const QUEST_PREFIX = "__NQTR-Quest__"

export interface QuestBaseModelProps {
    name?: string
    description?: string
    icon?: string
    descriptionImage?: string
    isInDevelopment?: boolean
}

export default class QuestBaseModel<TStage extends StageBaseModel = StageBaseModel> extends StoredClassModel {
    constructor(id: string, stages: TStage[], props: QuestBaseModelProps) {
        super(QUEST_PREFIX + id)
        this._stages = stages
        this._name = props.name || ""
        this._description = props.description || ""
        this._icon = props.icon || ""
        this._descriptionImage = props.descriptionImage || ""
        this._isInDevelopment = props.isInDevelopment || false
    }
    private _stages: TStage[]
    get stages(): TStage[] {
        return this._stages
    }

    private _name: string
    get name(): string {
        return this._name
    }

    private _description: string
    get description(): string {
        return this._description
    }

    private _icon: string
    get icon(): string {
        return this._icon
    }

    private _descriptionImage: string
    get descriptionImage(): string {
        return this._descriptionImage
    }

    private _isInDevelopment: boolean
    get isInDevelopment(): boolean {
        return this._isInDevelopment
    }
}
