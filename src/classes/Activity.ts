import { GraphicItemType, OnRenderGraphicItemProps, OnRunActivityProps } from '@drincs/nqtr/dist/override';
import { getFlag } from "@drincs/pixi-vn";
import TimeManager from "../managers/TimeManager";

export interface ActivityProps {
    /**
     * The name
     * @default ""
     */
    name?: string
    /**
     * The hour when the activity starts. If the activity is not started yet, it will be hidden.
     * If you set 3, the activity will be hidden into hours 1 and 2, and will be shown from hour 3.
     * @default TimeManager.minDayHours
     */
    fromHour?: number
    /**
     * The hour when the activity ends. If the activity is ended yet, it will be hidden.
     * If you set 3, the activity will be shown into hours 1 and 2 and will be hidden from hour 3.
     * @default TimeManager.maxDayHours + 1
     */
    toHour?: number
    /**
     * The day when the activity starts. If the activity is not started yet, it will be hidden.
     * If you set 3, the activity will be hidden into days 1 and 2, and will be shown from day 3.
     * @default undefined
     */
    fromDay?: number
    /**
     * The day when the activity ends. If the activity is ended yet, it will be deleted or hidden.
     * If you set 3, the activity will be shown into days 1 and 2 and will be deleted or hidden from day 3.
     * @default undefined
     */
    toDay?: number
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     * @default false
     */
    disabled?: boolean | string
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     * @default false
     */
    hidden?: boolean | string
    /**
     * The icon element. Can be a string or an Element or a Pixi'VN CanvasItem
     * @default undefined
     */
    renderIcon?: GraphicItemType | ((activity: ActivityStoredAbstract, props: OnRenderGraphicItemProps) => GraphicItemType)
}

/**
 * The function that is called when the activity is runned.
 */
export type OnRunActivityEvent<T> = (activity: T, props: OnRunActivityProps) => void

export abstract class ActivityStoredAbstract {
    /**
     * @param onRun The function that is called when the activity is runned. Have 2 parameters: the runned activity and the yourParams object, that is an object with the parameters that you want to pass to the onRun function.
     * @param props The activity properties.
     */
    constructor(onRun: OnRunActivityEvent<ActivityStoredAbstract>, props: ActivityProps) {
        this.defaultName = props.name
        this.defaultFromHour = props.fromHour
        this.defaultToHour = props.toHour
        this.defaultFromDay = props.fromDay
        this.defaultToDay = props.toDay
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._renderIcon = props.renderIcon
        this._onRun = onRun
    }

    abstract setStorageProperty<T>(propertyName: string, value: T | undefined): void;
    abstract getStorageProperty<T>(propertyName: string): T | undefined;
    abstract get id(): string

    private defaultName?: string
    /**
     * The name
     */
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName || ""
    }
    set name(value: string | undefined) {
        this.setStorageProperty("name", value)
    }

    private defaultFromHour?: number
    /**
     * The hour when the activity starts. If the activity is not started yet, it will be hidden.
     */
    get fromHour(): number {
        return this.getStorageProperty<number>("fromHour") || this.defaultFromHour || TimeManager.minDayHours
    }
    set fromHour(value: number | undefined) {
        this.setStorageProperty("fromHour", value)
    }

    private defaultToHour?: number
    /**
     * The hour when the activity ends. If the activity is ended yet, it will be hidden.
     */
    get toHour(): number {
        return this.getStorageProperty<number>("toHour") || this.defaultToHour || (TimeManager.maxDayHours + 1)
    }
    set toHour(value: number | undefined) {
        this.setStorageProperty("toHour", value)
    }

    private defaultFromDay?: number
    /**
     * The day when the activity starts. If the activity is not started yet, it will be hidden.
     */
    get fromDay(): number | undefined {
        return this.getStorageProperty<number>("fromDay") || this.defaultFromDay
    }
    set fromDay(value: number | undefined) {
        this.setStorageProperty("fromDay", value)
    }

    private defaultToDay?: number
    /**
     * The day when the activity ends. If the activity is ended yet, it will be deleted or hidden.
     */
    get toDay(): number | undefined {
        return this.getStorageProperty<number>("toDay") || this.defaultToDay
    }
    set toDay(value: number | undefined) {
        this.setStorageProperty("toDay", value)
    }

    private defaultDisabled: boolean | string
    /**
     * Whether is disabled.
     */
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean>("disabled") || this.defaultDisabled
        if (typeof value === "string") {
            return getFlag(value)
        }
        return value
    }
    set disabled(value: boolean | string) {
        this.setStorageProperty("disabled", value)
    }

    private defaultHidden: boolean | string
    /**
     * Whether is hidden. If the activity is not started yet, it will be hidden.
     */
    get hidden(): boolean {
        if (this.fromDay && this.fromDay > TimeManager.currentDay) {
            return true
        }
        if (!TimeManager.nowIsBetween(this.fromHour, this.toHour)) {
            return true
        }
        if (!this.isExpired) {
            return true
        }
        let value = this.getStorageProperty<boolean>("hidden") || this.defaultHidden
        if (typeof value === "string") {
            return getFlag(value)
        }
        return value
    }
    set hidden(value: boolean | string) {
        this.setStorageProperty("hidden", value)
    }

    private _renderIcon?: GraphicItemType | ((activity: ActivityStoredAbstract, props: OnRenderGraphicItemProps) => GraphicItemType)
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

    private _onRun: (activity: ActivityStoredAbstract, props: OnRunActivityProps) => void
    /**
     * The function that is called when the activity is runned.
     */
    get onRun(): (props: OnRunActivityProps) => void {
        return (props) => { return this._onRun(this, props) }
    }

    /**
     * Whether the activity is a deadline.
     * @returns Whether the activity is a deadline.
     */
    isExpired(): boolean {
        if (this.toDay && this.toDay <= TimeManager.currentDay) {
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
            name: this.getStorageProperty<string>("name") || this.defaultName,
            fromHour: this.getStorageProperty<number>("fromHour") || this.defaultFromHour,
            toHour: this.getStorageProperty<number>("toHour") || this.defaultToHour,
            fromDay: this.getStorageProperty<number>("fromDay") || this.defaultFromDay,
            toDay: this.getStorageProperty<number>("toDay") || this.defaultToDay,
            disabled: this.getStorageProperty<boolean>("disabled") || this.defaultDisabled,
            hidden: this.getStorageProperty<boolean>("hidden") || this.defaultHidden,
            renderIcon: this._renderIcon
        }
    }
}

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
 *         renderIcon: (activity, props) => {
 *             return <Button
 *                 disabled={activity.disabled}
 *                 onClick={() => {
 *                     if (!props) {
 *                         console.error("Props is undefined")
 *                         return
 *                     }
 *                     activity.onRun(props)
 *                 }}
 *                 ariaLabel={activity.name}
 *             >
 *                 <BedIcon />
 *             </Button>
 *         },
 *     }
 * )
 * ```
 */
export default class ActivityModel {
    /**
     * @param id The activity id, that must be unique.
     * @param onRun The function that is called when the activity is runned. Have 2 parameters: the runned activity and the yourParams object, that is an object with the parameters that you want to pass to the onRun function.
     * @param props The activity properties.
     */
    constructor(id: string, onRun: OnRunActivityEvent<ActivityModel>, props: ActivityProps) {
        this._id = id
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

    private _id: string
    /**
     * The activity id, that is unique.
     */
    get id(): string {
        return this._id
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
        if (this.fromDay && this.fromDay > TimeManager.currentDay) {
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
    get onRun(): (props: OnRunActivityProps) => void {
        return (props) => this._onRun(this, props)
    }

    /**
     * Whether the activity is a deadline.
     * @returns Whether the activity is a deadline.
     */
    isDeadline(): boolean {
        if (this.toDay && this.toDay <= TimeManager.currentDay) {
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
