import { StoredClassModel } from "@drincs/pixi-vn";
import { GraphicItemType } from "../types/GraphicItem";

const ACTIVITY_PREFIX = "__NQTR-Activity__"

export interface ActivityBaseModelProps {
    /**
     * The name of the room
     */
    name?: string
    /**
     * The start hour and end hour of the activity
     */
    startHour?: number
    /**
     * The start hour and end hour of the activity
     */
    endHour?: number
    /**
     * The start day and end day of the activity
     */
    startDay?: number
    /**
     * The start day and end day of the activity
     */
    endDay?: number
    /**
     * Whether the room is disabled
     */
    disabled?: boolean
    /**
     * Whether the room is hidden
     */
    hidden?: boolean
    /**
     * The icon element for the room. Can be a string or an HTMLElement or a CanvasItem
     */
    iconElement?: GraphicItemType
}

export default class ActivityBaseModel extends StoredClassModel {
    constructor(id: string, onRun: (activity: ActivityBaseModel) => void, props: ActivityBaseModelProps) {
        super(ACTIVITY_PREFIX + id)
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
        this.updateStorageProperty("name", value)
    }

    private defaultStartHour?: number
    get startHour(): number {
        return this.getStorageProperty<number>("startHour") || this.defaultStartHour || 0
    }
    set startHour(value: number) {
        this.updateStorageProperty("startHour", value)
    }

    private defaultEndHour?: number
    get endHour(): number {
        return this.getStorageProperty<number>("endHour") || this.defaultEndHour || 99
    }
    set endHour(value: number) {
        this.updateStorageProperty("endHour", value)
    }

    private defaultStartDay?: number
    get startDay(): number | undefined {
        return this.getStorageProperty<number>("startDay") || this.defaultStartDay
    }
    set startDay(value: number | undefined) {
        this.updateStorageProperty("startDay", value)
    }

    private defaultEndDay?: number
    get endDay(): number | undefined {
        return this.getStorageProperty<number>("endDay") || this.defaultEndDay
    }
    set endDay(value: number | undefined) {
        this.updateStorageProperty("endDay", value)
    }

    private defaultDisabled: boolean
    get disabled(): boolean {
        return this.getStorageProperty<boolean>("disabled") || this.defaultDisabled
    }
    set disabled(value: boolean) {
        this.updateStorageProperty("disabled", value)
    }

    private defaultHidden: boolean
    get hidden(): boolean {
        return this.getStorageProperty<boolean>("hidden") || this.defaultHidden
    }
    set hidden(value: boolean) {
        this.updateStorageProperty("hidden", value)
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
