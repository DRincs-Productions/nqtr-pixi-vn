import { StoredClassModel } from "@drincs/pixi-vn";
import { getActivityById } from "../../decorators";
import { GraphicItem } from "../../types/GraphicItem";
import ActivityBaseModel from "../Activity";
import LocationBaseModel from "./Location";

const ROOM_PREFIX = "__NQTR-Room__"

export interface RoomBaseModelProps<TActivity extends ActivityBaseModel> {
    /**
     * The name of the room
     */
    name?: string
    /**
     * The background of the room. Can be a string or an object with keys for different screen sizes.
     * Then define it as an object in order to manage multiple backgrounds, for example to have a background based on time.
     * @example
     * ```ts
     * {
     *    "morning": "morning-background.jpg",
     *    "afternoon": "afternoon-background.jpg",
     *    "evening": "evening-background.jpg",
     *    "night": "night-background.jpg"
     * }
     * ```
     */
    background?: string | { [key: string]: string }
    /**
     * The activities that are available in this room
     */
    activities?: TActivity[],
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
    iconElement?: GraphicItem
}

export default class RoomBaseModel<TLocation extends LocationBaseModel = LocationBaseModel, TActivity extends ActivityBaseModel = ActivityBaseModel> extends StoredClassModel {
    constructor(id: string, location: TLocation, props: RoomBaseModelProps<TActivity>) {
        super(ROOM_PREFIX + id)
        this._location = location
        this.defaultName = props.name || ""
        this.defaultBackground = props.background
        this.defaultActivities = props.activities || []
        this.activities = props.activities || []
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._iconElement = props.iconElement
    }

    private _location: TLocation
    get location(): TLocation {
        return this._location
    }

    private defaultName: string
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string) {
        this.updateStorageProperty("name", value)
    }

    private defaultBackground?: string | { [key: string]: string }
    get background(): string | { [key: string]: string } | undefined {
        return this.getStorageProperty<string>("background") || this.defaultBackground
    }
    set background(value: string | { [key: string]: string } | undefined) {
        this.updateStorageProperty("background", value)
    }

    private defaultActivityIds: string[] = []
    private get defaultActivities(): TActivity[] {
        return this.defaultActivityIds.map(id => getActivityById<TActivity>(id)).filter(activity => activity !== undefined)
    }
    private set defaultActivities(value: TActivity[]) {
        this.defaultActivityIds = value.map(activity => activity.id)
    }
    addActivity(activity: TActivity) {
        let activityIds = this.getStorageProperty<string[]>("activities") || this.defaultActivityIds
        activityIds.push(activity.id)
        this.updateStorageProperty("activities", activityIds)
    }
    removeActivity(activity: TActivity) {
        let activityIds = this.getStorageProperty<string[]>("activities") || this.defaultActivityIds
        activityIds = activityIds.filter(id => id !== activity.id)
        this.updateStorageProperty("activities", activityIds)
    }
    get activities(): TActivity[] {
        let activityIds = this.getStorageProperty<string[]>("activities") || this.defaultActivityIds
        return activityIds.map(id => getActivityById<TActivity>(id)).filter(activity => activity !== undefined)
    }
    set activities(value: TActivity[]) {
        let activityIds = value.map(activity => activity.id)
        this.updateStorageProperty("activities", activityIds)
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

    private _iconElement?: GraphicItem
    get iconElement(): GraphicItem | undefined {
        return this._iconElement
    }
}
