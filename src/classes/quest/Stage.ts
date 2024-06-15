import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override";
import { StoredClassModel, getFlag } from "@drincs/pixi-vn";
import { StageProps } from "../../interface";
import StageFlags from "../../interface/quest/StageFlags";
import { TimeManager } from "../../managers";
import { QuestsRequiredType } from "../../types/QuestsRequired";
import Goal, { GoalStage } from "./Goal";

const STAGE_CATEGORY = "__nqtr-stage__"

export default class Stage extends StoredClassModel implements StageProps {
    constructor(id: string, props: StageProps) {
        super(STAGE_CATEGORY, id)
        this._name = props.name || ""
        this._defaultGoals = props.goals || []
        this._flags = props.flags || []
        this._description = props.description || ""
        this._adviceDescription = props.adviceDescription || ""
        this._renderImage = props.renderImage || ""
        this._daysRequiredToStart = props.daysRequiredToStart
        this._flagsRequiredToStart = props.flagsRequired
        this._questsRequiredToStart = props.questsRequired
        this._requestDescriptionToStart = props.requestDescription || ""
        this._onStart = props.onStart
        this._onEnd = props.onEnd
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

    private _renderImage?: GraphicItemType | ((room: Stage, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the image of the stage.
     */
    get renderImage(): ((props: OnRenderGraphicItemProps) => GraphicItemType) | undefined {
        let render = this._renderImage
        if (render === undefined) {
            return undefined
        }
        if (typeof render === "function") {
            return (props: OnRenderGraphicItemProps) => {
                return render(this, props)
            }
        }
        return (props: OnRenderGraphicItemProps) => render
    }

    private _defaultGoals: Goal[]
    get defaultGoals(): Goal[] {
        return this._defaultGoals
    }

    private _flags: StageFlags[]
    /**
     * The list of flags that the player must complete to finish the stage.
     */
    get flags(): StageFlags[] {
        return this._flags
    }

    // request to start

    private _daysRequiredToStart?: number
    get daysRequiredToStart(): number {
        return this._daysRequiredToStart || 0
    }

    private _flagsRequiredToStart?: StageFlags[]
    get flagsRequiredToStart(): StageFlags[] {
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

    // function

    private _onStart?: () => Promise<void> | void
    get onStart(): undefined | (() => Promise<void> | void) {
        return this._onStart
    }

    private _onEnd?: () => Promise<void> | void
    get onEnd(): undefined | (() => Promise<void> | void) {
        return this._onEnd
    }
}

export class StageQuest extends Stage {
    constructor(id: string, props: StageProps) {
        super(id, props)
    }

    get completed(): boolean {
        let storedCompleted = this.getStorageProperty<boolean>('completed')
        if (storedCompleted) {
            return storedCompleted
        }
        if (!this.flags.every(flag => getFlag(flag.flag))) {
            return false
        }
        if (!this.goals.every(goal => goal.completed)) {
            return false
        }
        return true
    }
    set completed(value: boolean) {
        this.setStorageProperty('completed', value)
    }

    /**
     * The list of goals that the player needs to complete to finish the stage.
     */
    get goals(): GoalStage[] {
        return this.defaultGoals.map((goal) => {
            return new GoalStage(goal.id, this.id, goal)
        })
    }

    private get prevStageEndDay(): number | undefined {
        return this.getStorageProperty<number>('prevStageEndDay')
    }
    private set prevStageEndDay(value: number | undefined) {
        this.setStorageProperty('prevStageEndDay', value)
    }

    get startDay(): number | undefined {
        let prevStageEndDay = this.prevStageEndDay
        if (prevStageEndDay === undefined) {
            return undefined
        }
        return prevStageEndDay + this.daysRequiredToStart
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
        if (this.flagsRequiredToStart.length > 0 && !this.flagsRequiredToStart.every(flag => getFlag(flag.flag))) {
            return false
        }
        if (this.questsRequiredToStart.length > 0 && !this.questsRequiredToStart.every(q =>
            q.quest.currentStageIndex && q.quest.currentStageIndex >= q.stageNumber
        )) {
            return false
        }
        return true
    }

    get onStart(): undefined | (() => Promise<void> | void) {
        if (this.daysRequiredToStart > 0) {
            this.prevStageEndDay = TimeManager.currentDay
        }
        return super.onStart
    }
}
