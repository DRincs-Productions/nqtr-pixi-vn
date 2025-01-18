import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override";
import { getFlag } from "@drincs/pixi-vn";
import { getActivityById, saveRoom } from "../../decorators";
import { getCurrentRoutine } from "../../functions/RoutineFunctions";
import { RoomProps } from "../../interface";
import { RoomActivityMemory } from "../../interface/RoomActivityMemory";
import ActivityModel from "../Activity";
import CommitmentBaseModel from "../Commitment";
import ActivityRoom from "./ActivityRoom";
import LocationBaseModel from "./LocationBaseModel";
import RoomStoredClass from "./RoomStoredClass";

/**
 * The base model of a room. I suggest you extend this class to create your own room model.
 * **You must use the {@link saveRoom} function to save the room in the registered rooms.**
 * @example
 * ```ts
 * export const mcRoom = new RoomBaseModel('mc_room', mcHome, {
 *     name: "MC Room",
 *     icon: "https://icon.jpg",
 *     image: "https://image.jpg",
 *     isEntrance: false,
 * })
 * saveRoom(mcRoom)
 * ```
 */
export default class RoomBaseModel<TLocation extends LocationBaseModel = LocationBaseModel> extends RoomStoredClass {
    /**
     * @param id The id of the room, it must be unique.
     * @param location The location where the room is.
     * @param props The properties of the room.
     */
    constructor(id: string, location: TLocation, props: RoomProps<TLocation> = {}) {
        super(id)
        this._location = location
        this.defaultName = props.name || ""
        this._renderImage = props.renderImage
        this.defaultActivityIds = props.defaultActivities?.map(activity => activity.id) || []
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._renderIcon = props.renderIcon
        this._isEntrance = props.isEntrance
    }

    private _location: TLocation
    /**
     * The location where the room is.
     */
    get location(): TLocation {
        return this._location
    }

    private _isEntrance?: boolean
    /**
     * Whether is an entrance room, so when the player enters in the location, it will be the first room to be shown.
     */
    get isEntrance(): boolean {
        return this._isEntrance || false
    }

    private defaultName: string
    /**
     * The name.
     * If you set undefined, it will return the initial value of name.
     */
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string | undefined) {
        this.setStorageProperty("name", value)
    }

    private _renderImage?: GraphicItemType | ((room: RoomBaseModel<TLocation>, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the image of the room.
     */
    get renderImage(): ((props: OnRenderGraphicItemProps) => GraphicItemType) | undefined {
        let render = this._renderImage
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

    private defaultActivityIds: string[]
    /**
     * The activities that are available in this room.
     */
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
            return new ActivityRoom(id, this, activity._initialOnRun, memory)
        }).filter(activity => activity !== undefined)
        return activities as ActivityRoom<this>[]
    }

    private get activityIds(): string[] {
        let addedActivityIds = this.getStorageProperty<string[]>(`addedActivityIds`) || []
        return this.defaultActivityIds.concat(addedActivityIds)
    }
    /**
     * The activities that are available in this room.
     */
    get activities(): ActivityRoom<this>[] {
        let activities = this.activityIds.map(id => {
            return this.getActivity(id)
        }).filter(activity => activity !== undefined && !activity.hidden)
        return activities as ActivityRoom<this>[]
    }
    /**
     * Get the memory of an activity. This function can be used into olther libraries to get the memory of the activity.
     * @param id The id of the activity.
     * @returns The memory of the activity.
     */
    getActivityMemory(id: string): object | undefined {
        let roomMemories = this.getStorageProperty<RoomActivityMemory>("activities_memory") || {}
        let roomMemory = roomMemories[id] || {}
        return roomMemory
    }
    /**
     * Get the activity by id.
     * @param id The id of the activity.
     * @returns The room activity.
     */
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
        return new ActivityRoom(id, this, activity._initialOnRun, roomMemory)
    }
    /**
     * Set the memory of an activity. This function can be used into olther libraries to set the memory of the activity.
     * @param id The id of the activity.
     * @param memory The memory of the activity.
     */
    setActivity(activity: ActivityRoom) {
        let roomMemories = this.getStorageProperty<RoomActivityMemory>("activities_memory") || {}
        roomMemories[activity.id] = activity.export()
        this.setStorageProperty("activities_memory", roomMemories)
    }
    /**
     * Add an activity to the room.
     * @param activity The activity to add.
     */
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
    /**
     * Remove an activity from the room.
     * @param activity The activity to remove.
     */
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
    /**
     * Clear all expired activities.
     */
    clearExpiredActivities() {
        this.activities.forEach(activity => {
            if (activity.isExpired()) {
                this.removeActivity(activity.id)
            }
        })
    }

    private defaultDisabled: boolean | string
    /**
     * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
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
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
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

    private _renderIcon?: GraphicItemType | ((room: RoomBaseModel<TLocation>, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the icon of the room.
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

    /**
     * Get the character commitments of the room.
     * @returns The character commitments of the room.
     */
    getRoutine<TCommitment extends CommitmentBaseModel = CommitmentBaseModel>(): TCommitment[] {
        let commitments = getCurrentRoutine<TCommitment>()
        return commitments.filter(c => c.room.id === this.id)
    }
}
