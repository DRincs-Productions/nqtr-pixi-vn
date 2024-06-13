import { StoredClassModel, getFlag } from "@drincs/pixi-vn";
import { StageProps } from "../../interface";
import { TimeManager } from "../../managers";
import { QuestsRequiredType } from "../../types/QuestsRequired";

const STAGE_CATEGORY = "__nqtr-stage__"

export default class StageBaseModel extends StoredClassModel {
    constructor(id: string, props: StageProps) {
        super(STAGE_CATEGORY, id)
        this._name = props.name || ""
        this._description = props.description || ""
        this._adviceDescription = props.adviceDescription || ""
        this._image = props.image || ""
        this._daysRequiredToStart = props.daysRequiredToStart
        this._flagsRequiredToStart = props.flagsRequired
        this._questsRequiredToStart = props.questsRequired
        this._requestDescriptionToStart = props.requestDescription || ""
        this._onStart = props.onStart
        this._onEnd = props.onEnd
    }

    // info

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

    get completed(): boolean {
        let storedCompleted = this.getStorageProperty<boolean>('completed')
        if (storedCompleted) {
            return storedCompleted
        }
        if (!this.flags.every(flag => getFlag(flag))) {
            return false
        }
        return true
    }
    set completed(value: boolean) {
        this.setStorageProperty('completed', value)
    }

    // values

    // private defaultGoals: Goal[] = []
    // /**
    //  * The list of goals that the player needs to complete to finish the stage.
    //  * This feature is still in development.
    //  */
    // get goals(): Goal[] {
    //     let list = this.getStorageProperty<IGoalMemory[]>('goals')
    //     if (!list || list.length !== this.defaultGoals.length) {
    //         return this.defaultGoals
    //     }
    //     return this.defaultGoals.map((goal, index) => {
    //         goal.have = list[index].have
    //         return goal
    //     })
    // }
    // set goals(value: Goal[]) {
    //     let list = value.map(goal => goal.export)
    //     this.setStorageProperty('goals', list)
    // }

    private _flags: string[] = []
    /**
     * The list of flags that the player must complete to finish the stage.
     */
    get flags(): string[] {
        return this._flags
    }

    // request to start

    get prevStageEndDay(): number | undefined {
        return this.getStorageProperty<number>('prevStageEndDay')
    }
    set prevStageEndDay(value: number | undefined) {
        this.setStorageProperty('prevStageEndDay', value)
    }

    private _daysRequiredToStart?: number
    get daysRequiredToStart(): number {
        return this._daysRequiredToStart || 0
    }

    private _flagsRequiredToStart?: string[]
    get flagsRequiredToStart(): string[] {
        return this._flagsRequiredToStart || []
    }

    private _questsRequiredToStart?: QuestsRequiredType[]
    get questsRequiredToStart(): QuestsRequiredType[] {
        return this._questsRequiredToStart || []
    }

    private _requestDescriptionToStart: string
    get requestDescriptionToStart(): string {
        return this._requestDescriptionToStart
    }

    get canStart(): boolean {
        let daysRequired = this.daysRequiredToStart
        if (daysRequired > 0) {
            let prevStageEndDay = this.prevStageEndDay
            if (prevStageEndDay === undefined) {
                return false
            }
            if (prevStageEndDay + daysRequired > TimeManager.currentDay) {
                return false
            }
        }
        if (this.flagsRequiredToStart.length > 0 && !this.flagsRequiredToStart.every(flag => getFlag(flag))) {
            return false
        }
        if (this.questsRequiredToStart.length > 0 && !this.questsRequiredToStart.every(q =>
            q.quest.currentStageIndex && q.quest.currentStageIndex >= q.stageNumber
        )) {
            return false
        }
        return true
    }

    // function

    private _onStart?: () => void
    get onStart(): undefined | (() => void) {
        return this._onStart
    }

    private _onEnd?: () => void
    get onEnd(): undefined | (() => void) {
        return this._onEnd
    }
}
