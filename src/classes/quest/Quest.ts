import { StoredClassModel } from "@drincs/pixi-vn";
import { QuestProps } from "../../interface";
import StageBaseModel from "./Stage";

const QUEST_CATEGORY = "__nqtr-quest__"

export default class QuestBaseModel<TStage extends StageBaseModel = StageBaseModel> extends StoredClassModel {
    constructor(id: string, stages: TStage[], props: QuestProps) {
        super(QUEST_CATEGORY, id)
        this._stages = stages
        this._name = props.name || ""
        this._description = props.description || ""
        this._icon = props.icon || ""
        this._image = props.image || ""
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

    private _image: string
    get image(): string {
        return this._image
    }

    private _isInDevelopment: boolean
    get isInDevelopment(): boolean {
        return this._isInDevelopment
    }
}
