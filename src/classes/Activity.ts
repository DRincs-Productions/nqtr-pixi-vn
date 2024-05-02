import { getFlag } from "@drincs/pixi-vn";
import TimeManager from "../managers/TimeManager";
import { GraphicItemType } from "../types/GraphicItem";

export interface ActivityProps {
    /**
     * The name
     */
    name?: string
    /**
     * The hour when the activity starts. If the activity is not started yet, it will be hidden.
     * If you set 3, the activity will be hidden into hours 1 and 2, and will be shown from hour 3.
     */
    fromHour?: number
    /**
     * The hour when the activity ends. If the activity is ended yet, it will be hidden.
     * If you set 3, the activity will be shown into hours 1 and 2 and will be hidden from hour 3.
     */
    toHour?: number
    /**
     * The day when the activity starts. If the activity is not started yet, it will be hidden.
     * If you set 3, the activity will be hidden into days 1 and 2, and will be shown from day 3.
     */
    fromDay?: number
    /**
     * The day when the activity ends. If the activity is ended yet, it will be deleted or hidden.
     * If you set 3, the activity will be shown into days 1 and 2 and will be deleted or hidden from day 3.
     */
    toDay?: number
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     */
    disabled?: boolean | string
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     */
    hidden?: boolean | string
    /**
     * The icon element. Can be a string or an Element or a Pixi'VN CanvasItem
     */
    iconElement?: GraphicItemType
}

export abstract class ActivityStoredAbstract {
    constructor(onRun: (activity: ActivityModel) => void, props: ActivityProps) {
        this.defaultName = props.name
        this.defaultFromHour = props.fromHour
        this.defaultToHour = props.toHour
        this.defaultFromDay = props.fromDay
        this.defaultToDay = props.toDay
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._iconElement = props.iconElement
        this._onRun = onRun
    }

    abstract setStorageProperty<T>(propertyName: string, value: T | undefined): void;
    abstract getStorageProperty<T>(propertyName: string): T | undefined;
    abstract get id(): string

    private defaultName?: string
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName || ""
    }
    set name(value: string | undefined) {
        this.setStorageProperty("name", value)
    }

    private defaultFromHour?: number
    get fromHour(): number {
        return this.getStorageProperty<number>("fromHour") || this.defaultFromHour || TimeManager.minDayHours
    }
    set fromHour(value: number | undefined) {
        this.setStorageProperty("fromHour", value)
    }

    private defaultToHour?: number
    get toHour(): number {
        return this.getStorageProperty<number>("toHour") || this.defaultToHour || (TimeManager.maxDayHours + 1)
    }
    set toHour(value: number | undefined) {
        this.setStorageProperty("toHour", value)
    }

    private defaultFromDay?: number
    get fromDay(): number | undefined {
        return this.getStorageProperty<number>("fromDay") || this.defaultFromDay
    }
    set fromDay(value: number | undefined) {
        this.setStorageProperty("fromDay", value)
    }

    private defaultToDay?: number
    get toDay(): number | undefined {
        return this.getStorageProperty<number>("toDay") || this.defaultToDay
    }
    set toDay(value: number | undefined) {
        this.setStorageProperty("toDay", value)
    }

    private defaultDisabled: boolean | string
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

    private _iconElement?: GraphicItemType
    get iconElement(): GraphicItemType | undefined {
        return this._iconElement
    }

    private _onRun: (activity: ActivityModel) => void
    get onRun() {
        return this._onRun
    }

    isExpired(): boolean {
        if (this.toDay && this.toDay <= TimeManager.currentDay) {
            return true
        }
        return false
    }

    export(): ActivityProps {
        return {
            name: this.getStorageProperty<string>("name") || this.defaultName,
            fromHour: this.getStorageProperty<number>("fromHour") || this.defaultFromHour,
            toHour: this.getStorageProperty<number>("toHour") || this.defaultToHour,
            fromDay: this.getStorageProperty<number>("fromDay") || this.defaultFromDay,
            toDay: this.getStorageProperty<number>("toDay") || this.defaultToDay,
            disabled: this.getStorageProperty<boolean>("disabled") || this.defaultDisabled,
            hidden: this.getStorageProperty<boolean>("hidden") || this.defaultHidden,
            iconElement: this._iconElement
        }
    }
}

export default class ActivityModel {
    constructor(id: string, onRun: (activity: ActivityModel) => void, props: ActivityProps) {
        this._id = id
        this._name = props.name
        this._fromHour = props.fromHour
        this._toHour = props.toHour
        this._fromDay = props.fromDay
        this._toDay = props.toDay
        this._disabled = props.disabled || false
        this._hidden = props.hidden || false
        this._iconElement = props.iconElement
        this._onRun = onRun
    }

    private _id: string
    get id(): string {
        return this._id
    }

    private _name?: string
    get name(): string | undefined {
        return this._name
    }

    private _fromHour?: number
    get fromHour(): number | undefined {
        return this._fromHour
    }

    private _toHour?: number
    get toHour(): number | undefined {
        return this._toHour
    }

    private _fromDay?: number
    get fromDay(): number | undefined {
        return this._fromDay
    }

    private _toDay?: number
    get toDay(): number | undefined {
        return this._toDay
    }

    private _disabled?: boolean | string
    get disabled(): boolean | undefined {
        if (typeof this._disabled === "string") {
            return getFlag(this._disabled)
        }
        return this._disabled
    }

    private _hidden: boolean | string
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

    private _iconElement?: GraphicItemType
    get iconElement(): GraphicItemType | undefined {
        return this._iconElement
    }

    private _onRun: (activity: ActivityModel) => void
    get onRun() {
        return this._onRun
    }

    isDeadline(): boolean {
        if (this.toDay && this.toDay <= TimeManager.currentDay) {
            return true
        }
        return false
    }

    export(): ActivityProps {
        return {
            name: this._name,
            fromHour: this._fromHour,
            toHour: this._toHour,
            fromDay: this._fromDay,
            toDay: this._toDay,
            disabled: this._disabled,
            hidden: this._hidden,
            iconElement: this._iconElement,
        }
    }
}
