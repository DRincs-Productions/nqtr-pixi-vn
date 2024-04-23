import { getFlag, StoredClassModel } from "@drincs/pixi-vn";
import TimeManager from "../managers/TimeManager";
import { GraphicItemType } from "../types/GraphicItem";

const ACTIVITY_CATEGORY = "__NQTR-Activity__"

export interface ActivityBaseModelProps {
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
     * The icon element. Can be a string or an HTMLElement or a Pixi'VN CanvasItem
     */
    iconElement?: GraphicItemType
}

export default class ActivityBaseModel extends StoredClassModel {
    constructor(id: string, onRun: (activity: ActivityBaseModel) => void, props: ActivityBaseModelProps) {
        super(ACTIVITY_CATEGORY, id)
        this.defaultName = props.name || ""
        this.defaultFromHour = props.fromHour
        this.defaultToHour = props.toHour
        this.defaultFromDay = props.fromDay
        this.defaultToDay = props.toDay
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._iconElement = props.iconElement
        this._onRun = onRun
    }

    private defaultName: string
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string) {
        this.setStorageProperty("name", value)
    }

    private defaultFromHour?: number
    get fromHour(): number {
        return this.getStorageProperty<number>("fromHour") || this.defaultFromHour || TimeManager.minDayHour
    }
    set fromHour(value: number) {
        this.setStorageProperty("fromHour", value)
    }

    private defaultToHour?: number
    get toHour(): number {
        return this.getStorageProperty<number>("toHour") || this.defaultToHour || (TimeManager.maxDayHour + 1)
    }
    set toHour(value: number) {
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
        if (!this.isDeadline) {
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

    private _onRun: (activity: ActivityBaseModel) => void
    get onRun() {
        return this._onRun
    }

    isDeadline(): boolean {
        if (this.toDay && this.toDay <= TimeManager.currentDay) {
            return true
        }
        return false
    }
}
