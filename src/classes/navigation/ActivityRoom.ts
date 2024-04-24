import ActivityModel, { ActivityProps, ActivityStoredAbstract } from "../Activity";
import RoomBaseModel from "./Room";

export class ActivityRoom<TRoom extends RoomBaseModel = RoomBaseModel> extends ActivityStoredAbstract {
    constructor(id: string, room: TRoom, onRun: (activity: ActivityModel) => void, props: ActivityProps) {
        super(onRun, props)
        this._id = id
        this._room = room
    }
    setStorageProperty<T>(propertyName: string, value: T | undefined): void {
        this._room.setActivity(this)
    }
    getStorageProperty<T>(propertyName: string): T | undefined {
        let activity = this._room.getActivityMemory(this.id)
        if (!activity || !activity.hasOwnProperty(propertyName)) {
            return undefined
        }
        return (activity as any)[propertyName]
    }
    private _id: string;
    get id(): string {
        return this._id;
    }
    private _room: TRoom;
    get room(): TRoom {
        return this._room;
    }

    export(): object {
        let result: any = {}
        if (this.name !== undefined) {
            result["name"] = this.name
        }
        if (this.fromHour !== undefined) {
            result["fromHour"] = this.fromHour
        }
        if (this.toHour !== undefined) {
            result["toHour"] = this.toHour
        }
        if (this.fromDay !== undefined) {
            result["fromDay"] = this.fromDay
        }
        if (this.toDay !== undefined) {
            result["toDay"] = this.toDay
        }
        if (this.disabled !== undefined) {
            result["disabled"] = this.disabled
        }
        return result
    }
}