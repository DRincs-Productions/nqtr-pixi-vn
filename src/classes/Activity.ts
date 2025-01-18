import { GraphicItemType, OnRenderGraphicItemProps, OnRunProps } from '@drincs/nqtr/dist/override';
import { getFlag } from "@drincs/pixi-vn";
import { ActivityProps } from '../interface';
import { timeTracker } from '../managers';
import { OnRunActivityEvent } from '../types/OnRunActivityEvent';
import ActivityStoredClass from './ActivityStoredClass';

/**
 * The activity model. It is used to create an activity.
 * @example
 * ```tsx
 * export const nap = new ActivityModel("nap",
 *     (_, event) => {
 *         if (event) {
 *             event.navigate("/game")
 *             callLabelWithGoNavigationCallBack(napLabel, event)
 *         }
 *         else {
 *             console.error("Event is undefined")
 *         }
 *     },
 *     {
 *         name: "Nap",
 *         fromHour: 5,
 *         toHour: 23,
 *         icon: "https://icon.jpg",
 *     }
 * )
 * ```
 */
export default class ActivityModel extends ActivityStoredClass {
    /**
     * @param id The activity id, that must be unique.
     * @param onRun The function that is called when the activity is runned. Have 2 parameters: the runned activity and the yourParams object, that is an object with the parameters that you want to pass to the onRun function.
     * @param props The activity properties.
     */
    constructor(id: string, onRun: OnRunActivityEvent<ActivityModel>, props: ActivityProps) {
        super(id)
        this._name = props.name
        this._fromHour = props.fromHour
        this._toHour = props.toHour
        this._fromDay = props.fromDay
        this._toDay = props.toDay
        this._disabled = props.disabled || false
        this._hidden = props.hidden || false
        this._renderIcon = props.renderIcon
        this._onRun = onRun
    }

    private _name?: string
    /**
     * The name
     */
    get name(): string | undefined {
        return this._name
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

    private _disabled?: boolean | string
    /**
     * Whether is disabled.
     */
    get disabled(): boolean | undefined {
        if (typeof this._disabled === "string") {
            return getFlag(this._disabled)
        }
        return this._disabled
    }

    private _hidden: boolean | string
    /**
     * Whether is hidden. If the activity is not started yet, it will be hidden.
     */
    get hidden(): boolean {
        if (this.fromDay && this.fromDay > timeTracker.currentDay) {
            return true
        }
        if (!this.isDeadline) {
            return true
        }
        if (typeof this._hidden === "string") {
            return getFlag(this._hidden)
        }
        return this._hidden
    }

    private _renderIcon?: GraphicItemType | ((activity: ActivityModel, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the icon of the activity.
     */
    get renderIcon(): ((props: OnRenderGraphicItemProps) => GraphicItemType) | undefined {
        let render = this._renderIcon
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

    private _onRun: OnRunActivityEvent<ActivityModel>
    get _initialOnRun(): OnRunActivityEvent<ActivityStoredAbstract> {
        return this._onRun as any
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

    /**
     * Export the activity properties.
     * @returns The activity properties.
     */
    export(): ActivityProps {
        return {
            name: this._name,
            fromHour: this._fromHour,
            toHour: this._toHour,
            fromDay: this._fromDay,
            toDay: this._toDay,
            disabled: this._disabled,
            hidden: this._hidden,
            renderIcon: this._renderIcon,
        }
    }
}
