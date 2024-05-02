import { getFlag, StoredClassModel } from "@drincs/pixi-vn";
import { getActivityById } from "../../decorators";
import { getCurrentCommitments } from "../../functions/RoutineFunctions";
import { GraphicItemType } from "../../types/GraphicItem";
import ActivityModel, { ActivityProps } from "../Activity";
import CommitmentBaseModel from "../Commitment";
import { ActivityRoom } from "./ActivityRoom";
import LocationBaseModel from "./Location";

export const ROOM_CATEGORY = "__nqtr-room__"

interface RoomActivityMemory { [key: string]: ActivityProps }

export interface RoomBaseModelProps {
    /**
     * The name
     */
    name?: string
    /**
     * The image. It can be a string, an Element or a Pixi'VN Canvas Item.
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
    defaultActivities?: ActivityModel[],
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
    /**
     * Whether is an entrance room, so when the player enters in the location, it will be the first room to be shown.
     */
    isEntrance?: boolean
}

export default class RoomBaseModel<TLocation extends LocationBaseModel = LocationBaseModel> extends StoredClassModel {
    constructor(id: string, location: TLocation, props: RoomBaseModelProps = {}) {
        super(ROOM_CATEGORY, id)
        this._location = location
        this.defaultName = props.name || ""
        this.defaultImage = props.image
        this.defaultActivityIds = props.defaultActivities?.map(activity => activity.id) || []
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._iconElement = props.iconElement
        this._isEntrance = props.isEntrance
    }

    private _location: TLocation
    get location(): TLocation {
        return this._location
    }

    private _isEntrance?: boolean
    get isEntrance(): boolean {
        return this._isEntrance || false
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

    private defaultActivityIds: string[]
    get defaultActivities(): ActivityRoom<this>[] {
        let roomMemories = this.getStorageProperty<RoomActivityMemory>("activities_memory") || {}
        let activities = this.defaultActivityIds.map(id => {
            let activity = getActivityById(id)
            if (!activity) {
                console.warn(`[NQTR] Activity with id ${id} not found, so it will be ignored.`)
                return undefined
            }
            let memory = activity.export()
            if (roomMemories && roomMemories[id]) {
                memory = {
                    ...memory,
                    ...roomMemories[id]
                }
            }
            return new ActivityRoom(id, this, activity.onRun, memory)
        }).filter(activity => activity !== undefined)
        return activities as ActivityRoom<this>[]
    }

    get activityIds(): string[] {
        let addedActivityIds = this.getStorageProperty<string[]>(`addedActivityIds`) || []
        return this.defaultActivityIds.concat(addedActivityIds)
    }
    get activities(): ActivityRoom<this>[] {
        let activities = this.activityIds.map(id => {
            return this.getActivity(id)
        }).filter(activity => activity !== undefined)
        return activities as ActivityRoom<this>[]
    }
    getActivityMemory(id: string): object | undefined {
        let roomMemories = this.getStorageProperty<RoomActivityMemory>("activities_memory") || {}
        let roomMemory = roomMemories[id] || {}
        return roomMemory
    }
    getActivity(id: string): ActivityRoom<this> | undefined {
        if (!this.activityIds.includes(id)) {
            console.error(`[NQTR] Activity with id ${id} not found in room ${this.id}`)
            return undefined
        }
        let activity = getActivityById(id)
        if (!activity) {
            console.error(`[NQTR] Activity with id ${id} not found`)
            return undefined
        }
        let roomMemories = this.getStorageProperty<RoomActivityMemory>("activities_memory") || {}
        let roomMemory = roomMemories[id] || {}
        roomMemory = {
            ...activity.export(),
            ...roomMemory
        }
        return new ActivityRoom(id, this, activity.onRun, roomMemory)
    }
    setActivity(activity: ActivityRoom) {
        let roomMemories = this.getStorageProperty<RoomActivityMemory>("activities_memory") || {}
        roomMemories[activity.id] = activity.export()
        this.setStorageProperty("activities_memory", roomMemories)
    }
    addActivity(activity: ActivityModel) {
        if (this.activityIds.includes(activity.id)) {
            let currentActivity = this.getActivity(activity.id)
            if (currentActivity && currentActivity.isExpired()) {
                this.removeActivity(activity.id)
                return
            } else {
                console.error(`[NQTR] Activity with id ${activity.id} already exists in room ${this.id}, so it will be ignored.`)
                return
            }
        }
        let addedActivityIds = this.getStorageProperty<string[]>(`addedActivityIds`) || []
        addedActivityIds.push(activity.id)
        this.setStorageProperty("addedActivityIds", addedActivityIds)
    }
    removeActivity(activity: ActivityModel | string) {
        let activityId = typeof activity === "string" ? activity : activity.id
        if (this.defaultActivityIds.includes(activityId)) {
            console.warn(`[NQTR] Activity with id ${activityId} is a default activity, so it can't be removed. It will be hidden instead.`)
            let activityToEdit = this.getActivity(activityId)
            if (!activityToEdit) {
                console.error(`[NQTR] Activity with id ${activityId} not found, so it can't be hidden.`)
                return
            }
            activityToEdit.hidden = true
            return
        }
        let addedActivityIds = this.getStorageProperty<string[]>(`addedActivityIds`) || []
        let index = addedActivityIds.indexOf(activityId)
        if (index === -1) {
            console.error(`[NQTR] Activity with id ${activityId} not found, so it can't be removed.`)
            return
        }
        addedActivityIds.splice(index, 1)
        this.setStorageProperty("addedActivityIds", addedActivityIds)
        let roomMemories = this.getStorageProperty<RoomActivityMemory>("activities_memory") || {}
        delete roomMemories[activityId]
        this.setStorageProperty("activities_memory", roomMemories)
    }
    clearExpiredActivities() {
        this.activities.forEach(activity => {
            if (activity.isExpired()) {
                this.removeActivity(activity.id)
            }
        })
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

    getRoutine<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
        let commitments = getCurrentCommitments<TCommitment>()
        return commitments.filter(c => c.room.id === this.id)
    }
}
