import { OnRunProps } from "@drincs/nqtr/dist/override"
import { StoredClassModel } from "@drincs/pixi-vn"
import { ActivityBaseInternalInterface } from "../interface/ActivityInterface"
import { timeTracker } from "../managers"
import { OnRunActivityEvent } from "../types/OnRunActivityEvent"

const ACTIVITY_CATEGORY = "__nqtr-Activity__"
export default class ActivityStoredClass extends StoredClassModel implements ActivityBaseInternalInterface {
    constructor(
        id: string,
        private readonly _onRun: OnRunActivityEvent,
        props: {
            fromHour?: number
            toHour?: number
            fromDay?: number
            toDay?: number
        }
    ) {
        super(ACTIVITY_CATEGORY, id)
        this._fromHour = props.fromHour
        this._toHour = props.toHour
        this._fromDay = props.fromDay
        this._toDay = props.toDay
    }

    private _fromHour?: number
    /**
     * The hour when the activity starts. If the activity is not started yet, it will be hidden.
     */
    get fromHour(): number | undefined {
        return this._fromHour
    }

    private _toHour?: number
    /**
     * The hour when the activity ends. If the activity is ended yet, it will be hidden.
     */
    get toHour(): number | undefined {
        return this._toHour
    }

    private _fromDay?: number
    /**
     * The day when the activity starts. If the activity is not started yet, it will be hidden.
     */
    get fromDay(): number | undefined {
        return this._fromDay
    }

    private _toDay?: number
    /**
     * The day when the activity ends. If the activity is ended yet, it will be deleted or hidden.
     */
    get toDay(): number | undefined {
        return this._toDay
    }

    /**
     * The function that is called when the activity is runned.
     */
    get run(): (props: OnRunProps) => void {
        return (props) => this._onRun(this, props)
    }

    /**
     * Whether the activity is a deadline.
     * @returns Whether the activity is a deadline.
     */
    isDeadline(): boolean {
        if (this.toDay && this.toDay <= timeTracker.currentDay) {
            return true
        }
        return false
    }
}
