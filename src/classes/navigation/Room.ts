import { getFlag, StoredClassModel } from "@drincs/pixi-vn";
import { getActivityById } from "../../decorators";
import { GraphicItemType } from "../../types/GraphicItem";
import ActivityBaseModel from "../Activity";
import LocationBaseModel from "./Location";

const ROOM_CATEGORY = "__NQTR-Room__"

export interface RoomBaseModelProps<TActivity extends ActivityBaseModel> {
    /**
     * The name
     */
    name?: string
    /**
     * The image. It can be a string, an HTMLElement or a Pixi'VN Canvas Item.
     * Or an object to manage multiple image types. For example to have a image based on time.
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
    image?: GraphicItemType | { [key: string]: GraphicItemType }
    /**
     * The activities that are available in this room.
     */
    defaultActivities?: TActivity[],
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

export default class RoomBaseModel<TLocation extends LocationBaseModel = LocationBaseModel, TActivity extends ActivityBaseModel = ActivityBaseModel> extends StoredClassModel {
    constructor(id: string, location: TLocation, props: RoomBaseModelProps<TActivity>) {
        super(ROOM_CATEGORY, id)
        this._location = location
        this.defaultName = props.name || ""
        this.defaultImage = props.image
        this.defaultActivities = props.defaultActivities || []
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
        this.setStorageProperty("name", value)
    }

    private defaultImage?: GraphicItemType | { [key: string]: GraphicItemType }
    get image(): GraphicItemType | { [key: string]: GraphicItemType } | undefined {
        return this.getStorageProperty<GraphicItemType>("image") || this.defaultImage
    }
    set image(value: GraphicItemType | { [key: string]: GraphicItemType } | undefined) {
        this.setStorageProperty("image", value)
    }

    private defaultActivities: TActivity[]
    get defaultActivityIds(): string[] {
        return this.defaultActivities.map(activity => activity.id)
    }
    addAdditionalActivity(activity: TActivity) {
        let activityIds = this.getStorageProperty<string[]>("additional_activities") || []
        if (activityIds.includes(activity.id) || this.defaultActivityIds.includes(activity.id)) {
            console.warn(`[NQTR] Activity id ${activity.id} already exists in room ${this.id}`)
            return
        }
        activityIds.push(activity.id)
        this.setStorageProperty("additional_activities", activityIds)
    }
    removeAdditionalActivity(activity: TActivity) {
        let activityIds = this.getStorageProperty<string[]>("additional_activities") || []
        if (!activityIds.includes(activity.id)) {
            console.warn(`[NQTR] Activity id ${activity.id} does not exist in room ${this.id}`)
            return
        }
        activityIds = activityIds.filter(id => id !== activity.id)
        this.setStorageProperty("additional_activities", activityIds)
    }
    get additionalActivities(): TActivity[] {
        let activityIds = this.getStorageProperty<string[]>("additional_activities") || []
        return activityIds.map(id => getActivityById<TActivity>(id)).filter(activity => activity !== undefined)
    }
    set additionalActivities(value: TActivity[]) {
        let activityIds = value.map(activity => activity.id)
        this.setStorageProperty("additional_activities", activityIds)
    }
    get activities(): TActivity[] {
        return this.defaultActivities.concat(this.additionalActivities)
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
}
