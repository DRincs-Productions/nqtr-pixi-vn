import { GraphicItemType, OnRenderGraphicItemProps } from '@drincs/nqtr/dist/override';
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
    constructor(id: string, onRun: OnRunActivityEvent, props: ActivityProps) {
        super(id, onRun, {
            fromHour: props.fromHour,
            toHour: props.toHour,
            fromDay: props.fromDay,
            toDay: props.toDay,
        })
        this._name = props.name
        this._disabled = props.disabled || false
        this._hidden = props.hidden || false
        this._renderIcon = props.renderIcon
    }

    private _name?: string
    /**
     * The name
     */
    get name(): string | undefined {
        return this._name
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
}
