import { CharacterBaseModel, getFlag, StoredClassModel } from "@drincs/pixi-vn";
import { ExecutionTypeEnum } from "../enums/ExecutionTypeEnum";
import TimeManager from "../managers/TimeManager";
import { GraphicItemType } from "../types/GraphicItem";
import { RoomBaseModel } from "./navigation";

const COMMITMENT_CATEGORY = "__nqtr-commitment__"

export interface CommitmentBaseModelProps {
    /**
     * The name
     * @default ""
     */
    name?: string
    /**
     * The hour when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set 3, the commitment will be hidden into hours 1 and 2, and will be shown from hour 3.
     * @default TimeManager.minDayHours
     */
    fromHour?: number
    /**
     * The hour when the commitment ends. If the commitment is ended yet, it will be hidden.
     * If you set 3, the commitment will be shown into hours 1 and 2 and will be hidden from hour 3.
     * @default TimeManager.maxDayHours + 1
     */
    toHour?: number
    /**
     * The day when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set 3, the commitment will be hidden into days 1 and 2, and will be shown from day 3.
     */
    fromDay?: number
    /**
     * The day when the commitment ends. If the commitment is ended yet, it will be deleted or hidden.
     * If you set 3, the commitment will be shown into days 1 and 2 and will be deleted or hidden from day 3.
     */
    toDay?: number
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
     * Execution type. If is "automatic" the onRun() runned automatically when the palayer is in the room. If is "interaction" the player must interact with the character to run the onRun() function.
     * @default ExecutionTypeEnum.INTERACTION
     */
    executionType?: ExecutionTypeEnum
    /**
     * Is a function that is called when the player interacts with the character.
     * @param commitment 
     * @returns 
     */
    onRun?: (commitment: CommitmentBaseModel) => void
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     * If it is disabled this commitment will not be taken into consideration. So the characters will not be in the room, but will be busy with other commitments.
     * @default false
     */
    disabled?: boolean | string
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     * @default false
     */
    hidden?: boolean | string
}

/**
 * The base model of a commitment. I suggest you extend this class to create your own commitment model.
 * You must use the saveRoom function to save the commitment in the registered commitments.
 * @example
 * ```ts
 * export const mcRoom = new CommitmentBaseModel("test", character, room, {
 *     name: "Test",
 *     image: "https://image.jpg",
 *     executionType: ExecutionTypeEnum.INTERACTION,
 *     onRun: (commitment) => {
 *         // Do something
 *     }
})
 * saveCommitment(mcRoom)
 * ```
 */
export default class CommitmentBaseModel<TCharacter extends CharacterBaseModel = CharacterBaseModel, TRoom extends RoomBaseModel = RoomBaseModel> extends StoredClassModel {
    /**
     * @param id The id of the commitment, it must be unique.
     * @param character The character or characters that are in the commitment and so in the room.
     * @param room The room where the commitment is.
     * @param props The properties of the commitment.
     */
    constructor(id: string, character: TCharacter | TCharacter[] | undefined, room: TRoom, props: CommitmentBaseModelProps) {
        super(COMMITMENT_CATEGORY, id)
        this._characters = character ? Array.isArray(character) ? character : [character] : []
        this._room = room
        this._name = props.name || ""
        this.defaultFromHour = props.fromHour
        this.defaultToHour = props.toHour
        this.defaultFromDay = props.fromDay
        this.defaultToDay = props.toDay
        this._image = props.image
        this._executionType = props.executionType || ExecutionTypeEnum.INTERACTION
        this._onRun = props.onRun
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
    }

    private _characters: TCharacter[]
    /**
     * The character or characters that are in the commitment and so in the room.
     */
    get characters(): TCharacter[] {
        return this._characters
    }

    private _room: TRoom
    /**
     * The room where the commitment is.
     */
    get room(): TRoom {
        return this._room
    }

    private _name: GraphicItemType
    /**
     * The name
     */
    get name(): GraphicItemType {
        return this._name
    }

    private defaultFromHour?: number
    /**
     * The hour when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set undefined, it will return the default fromHour.
     */
    get fromHour(): number {
        return this.getStorageProperty<number>("fromHour") || this.defaultFromHour || TimeManager.minDayHours
    }
    set fromHour(value: number | undefined) {
        this.setStorageProperty("fromHour", value)
    }

    private defaultToHour?: number
    /**
     * The hour when the commitment ends. If the commitment is ended yet, it will be hidden.
     * If you set undefined, it will return the default toHour.
     */
    get toHour(): number {
        return this.getStorageProperty<number>("toHour") || this.defaultToHour || (TimeManager.maxDayHours + 1)
    }
    set toHour(value: number | undefined) {
        this.setStorageProperty("toHour", value)
    }

    private defaultFromDay?: number
    /**
     * The day when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set undefined, it will return the default fromDay.
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
     * If you set undefined, it will return the default toDay.
     */
    get toDay(): number | undefined {
        return this.getStorageProperty<number>("toDay") || this.defaultToDay
    }
    set toDay(value: number | undefined) {
        this.setStorageProperty("toDay", value)
    }

    private _image?: GraphicItemType | { [key: string]: GraphicItemType }
    /**
     * The image. It can be a string, an Element or a Pixi'VN Canvas Item.
     */
    get image(): GraphicItemType | { [key: string]: GraphicItemType } | undefined {
        return this._image
    }

    private _executionType: ExecutionTypeEnum
    /**
     * Execution type. If is "automatic" the onRun() runned automatically when the palayer is in the room. If is "interaction" the player must interact with the character to run the onRun() function.
     */
    get executionType(): ExecutionTypeEnum {
        return this._executionType
    }

    private _onRun?: (commitment: CommitmentBaseModel) => void
    /**
     * Is a function that is called when the player interacts with the character.
     */
    onRun() {
        if (!this._onRun) {
            console.warn("[NQTR] onRun() is not defined for commitmen, so it will not run.", this)
        }
        else {
            this._onRun(this)
        }
    }

    private defaultDisabled: boolean | string
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
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
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     */
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

    /**
     * Whether the commitment is expired.
     * @returns Whether the commitment is expired.
     */
    isExpired(): boolean {
        if (this.toDay && this.toDay <= TimeManager.currentDay) {
            return true
        }
        return false
    }
}
