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
     * The start hour and end hour
     */
    startHour?: number
    /**
     * The start hour and end hour
     */
    endHour?: number
    /**
     * The start day
     */
    startDay?: number
    /**
     * The end day
     */
    endDay?: number
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
        this.defaultStartHour = props.startHour
        this.defaultEndDay = props.endHour
        this.defaultStartDay = props.startDay
        this.defaultEndDay = props.endDay
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

    private defaultStartHour?: number
    get startHour(): number {
        return this.getStorageProperty<number>("startHour") || this.defaultStartHour || TimeManager.minDayHour
    }
    set startHour(value: number) {
        this.setStorageProperty("startHour", value)
    }

    private defaultEndHour?: number
    get endHour(): number {
        return this.getStorageProperty<number>("endHour") || this.defaultEndHour || (TimeManager.maxDayHour + 1)
    }
    set endHour(value: number) {
        this.setStorageProperty("endHour", value)
    }

    private defaultStartDay?: number
    get startDay(): number | undefined {
        return this.getStorageProperty<number>("startDay") || this.defaultStartDay
    }
    set startDay(value: number | undefined) {
        this.setStorageProperty("startDay", value)
    }

    private defaultEndDay?: number
    get endDay(): number | undefined {
        return this.getStorageProperty<number>("endDay") || this.defaultEndDay
    }
    set endDay(value: number | undefined) {
        this.setStorageProperty("endDay", value)
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
}
