import { GraphicItemType, OnRenderGraphicItemProps, OnRunActivityProps } from "@drincs/nqtr/dist/override"
import { getFlag } from "@drincs/pixi-vn"
import { ActivityProps } from "../interface"
import { TimeManager } from "../managers"
import { OnRunActivityEvent } from "../types/OnRunActivityEvent"

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
