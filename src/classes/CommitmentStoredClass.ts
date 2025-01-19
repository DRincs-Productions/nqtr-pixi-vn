import { CharacterInterface, StoredClassModel } from "@drincs/pixi-vn"
import { RoomInterface } from "../interface"
import { CommitmentBaseInternalInterface } from "../interface/CommitmentInterface"
import { ExecutionType } from "../types"

const COMMITMENT_CATEGORY = "__nqtr-commitment__"
export default class CommitmentStoredClass extends StoredClassModel implements CommitmentBaseInternalInterface {
    constructor(id: string,) {
        super(COMMITMENT_CATEGORY, id)
    }

    private _characters: CharacterInterface[]
    /**
     * The character or characters that are in the commitment and so in the room.
     */
    get characters(): CharacterInterface[] {
        return this._characters
    }

    private _room: RoomInterface
    /**
     * The room where the commitment is.
     */
    get room(): RoomInterface {
        return this._room
    }

    private _executionType: ExecutionType
    /**
     * Execution type. If is "automatic" the onRun() runned automatically when the palayer is in the room. If is "interaction" the player must interact with the character to run the onRun() function.
     * If you set "automatic" remember to remove the commitment when it is no longer needed, because otherwise it repeats itself every time.
     */
    get executionType(): ExecutionType {
        return this._executionType
    }

    private defaultPriority: number
    /**
     * The priority. The higher the number, the higher the priority.
     * To ensure that a character is not in 2 places at the same time, if there are 2 or more valid commits at the same time and with the same character, the one with the highest priority will be chosen.
     */
    get priority(): number {
        return this.getStorageProperty<number>("priority") || this.defaultPriority || 0
    }
    set priority(value: number) {
        this.setStorageProperty("priority", value)
    }








    private _onRun?: OnRunCommitmentEvent<CommitmentBaseModel>
    /**
     * Is a function that is called when the player interacts with the character.
     */
    get run(): undefined | ((props: OnRunProps) => void) {
        let onRun = this._onRun
        if (!onRun) {
            return
        }
        return (props) => onRun(this, props)
    }

    private defaultFromHour?: number
    /**
     * The hour when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set undefined, it will return the initial value of fromHour.
     */
    get fromHour(): number {
        return this.getStorageProperty<number>("fromHour") || this.defaultFromHour || timeTracker.minDayHours
    }
    set fromHour(value: number | undefined) {
        this.setStorageProperty("fromHour", value)
    }

    private defaultToHour?: number
    /**
     * The hour when the commitment ends. If the commitment is ended yet, it will be hidden.
     * If you set undefined, it will return the initial value of toHour.
     */
    get toHour(): number {
        return this.getStorageProperty<number>("toHour") || this.defaultToHour || (timeTracker.maxDayHours + 1)
    }
    set toHour(value: number | undefined) {
        this.setStorageProperty("toHour", value)
    }

    private defaultFromDay?: number
    /**
     * The day when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set undefined, it will return the initial value of fromDay.
     */
    get fromDay(): number | undefined {
        return this.getStorageProperty<number>("fromDay") || this.defaultFromDay
    }
    set fromDay(value: number | undefined) {
        this.setStorageProperty("fromDay", value)
    }

    private defaultToDay?: number
    /**
     * The day when the commitment ends. If the commitment is ended yet, it will be deleted or hidden.
     * If you set undefined, it will return the initial value of toDay.
     */
    get toDay(): number | undefined {
        return this.getStorageProperty<number>("toDay") || this.defaultToDay
    }
    set toDay(value: number | undefined) {
        this.setStorageProperty("toDay", value)
    }

    /**
     * Whether the commitment is expired.
     * @returns Whether the commitment is expired.
     */
    isExpired(): boolean {
        if (this.toDay && this.toDay <= timeTracker.currentDay) {
            return true
        }
        return false
    }
}
