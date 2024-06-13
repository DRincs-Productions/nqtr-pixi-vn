import { StoredClassModel } from "@drincs/pixi-vn";
import { StageProps } from "../../interface";
import { QuestsRequiredType } from "../../types/QuestsRequired";
import Goal, { IGoal } from "./Goal";

const STAGE_CATEGORY = "__nqtr-stage__"

export default class StageBaseModel extends StoredClassModel {
    constructor(id: string, props: StageProps) {
        super(STAGE_CATEGORY, id)
        this._name = props.name || ""
        this._description = props.description || ""
        this._adviceDescription = props.adviceDescription || ""
        this._image = props.image || ""
        this._daysRequiredToStart = props.daysRequiredToStart
        this._flagsRequired = props.flagsRequired
        this._questsRequired = props.questsRequired
        this._requestDescription = props.requestDescription || ""
        this._onStart = props.onStart
        this._onEnd = props.onEnd
    }


    private _completed: boolean = false
    get completed(): boolean {
        return this._completed
    }

    private _active: boolean = false
    get active(): boolean {
        return this._active
    }

    private defaultGoals: Goal[] = []
    get goals(): Goal[] {
        let list = this.getStorageProperty<IGoal[]>('goals')
        if (!list) {
            return this.defaultGoals
        }
        return list.map(goal => new Goal(goal))
    }
    set goals(value: Goal[]) {
        let list = value.map(goal => goal.export)
        this.setStorageProperty('goals', list)
    }

    private _name: string
    get name(): string {
        return this._name
    }

    private _description: string
    get description(): string {
        return this._description
    }

    private _adviceDescription: string
    get adviceDescription(): string {
        return this._adviceDescription
    }

    private _image: string
    get image(): string {
        return this._image
    }

    private _daysRequiredToStart?: number
    get daysRequiredToStart(): number {
        return this._daysRequiredToStart || 0
    }

    private _flagsRequired?: string[]
    get flagsRequired(): string[] {
        return this._flagsRequired || []
    }

    private _questsRequired?: QuestsRequiredType[]
    get questsRequired(): QuestsRequiredType[] {
        return this._questsRequired || []
    }

    private _requestDescription: string
    get requestDescription(): string {
        return this._requestDescription
    }

    private _onStart?: () => void
    get onStart(): undefined | (() => void) {
        return this._onStart
    }

    private _onEnd?: () => void
    get onEnd(): undefined | (() => void) {
        return this._onEnd
    }
}
