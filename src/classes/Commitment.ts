import { CharacterBaseModel, getFlag, StoredClassModel } from "@drincs/pixi-vn";
import { ExecutionTypeEnum } from "../enums/ExecutionTypeEnum";
import TimeManager from "../managers/TimeManager";
import { GraphicItemType } from "../types/GraphicItem";
import { RoomBaseModel } from "./navigation";

const COMMITMENT_CATEGORY = "__nqtr-commitment__"

export interface CommitmentBaseModelProps {
    /**
     * The name
     */
    name?: string
    /**
     * The start hour
     */
    startHour?: number
    /**
     * The end hour
     */
    endHour?: number
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
     * The end day
     */
    endDay?: number
    /**
     * Execution type. If is "automatic" the onInteraction() runned automatically when the palayer is in the room. If is "interaction" the player must interact with the character to run the onInteraction() function.
     */
    executionType?: ExecutionTypeEnum
    /**
     * Is a function that is called when the player interacts with the character.
     * @param commitment 
     * @returns 
     */
    onInteraction?: (commitment: CommitmentBaseModel) => void
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     * If it is disabled this commitment will not be taken into consideration. So the characters will not be in the room, but will be busy with other commitments.
     */
    disabled?: boolean | string
}

export default class CommitmentBaseModel<TCharacter extends CharacterBaseModel = CharacterBaseModel, TRoom extends RoomBaseModel = RoomBaseModel> extends StoredClassModel {
    constructor(id: string, character: TCharacter | TCharacter[], room: TRoom, props: CommitmentBaseModelProps) {
        super(COMMITMENT_CATEGORY, id)
        this._characters = Array.isArray(character) ? character : [character]
        this._room = room
        this._name = props.name || ""
        this._startHour = props.startHour
        this._endHour = props.endHour
        this._image = props.image
        this._endDay = props.endDay
        this._executionType = props.executionType || ExecutionTypeEnum.INTERACTION
        this._onInteraction = props.onInteraction
        this.defaultDisabled = props.disabled || false
    }

    private _characters: TCharacter[]
    get characters(): TCharacter[] {
        return this._characters
    }

    private _room: TRoom
    get room(): TRoom {
        return this._room
    }

    private _name: GraphicItemType
    get name(): GraphicItemType {
        return this._name
    }

    private _startHour?: number
    get startHour(): number {
        return this._startHour || TimeManager.minDayHour
    }

    private _endHour?: number
    get endHour(): number {
        return this._endHour || (TimeManager.maxDayHour + 1)
    }

    private _image?: GraphicItemType | { [key: string]: GraphicItemType }
    get image(): GraphicItemType | { [key: string]: GraphicItemType } | undefined {
        return this._image
    }

    private _endDay?: number
    get endDay(): number | undefined {
        return this._endDay
    }

    private _executionType: ExecutionTypeEnum
    get executionType(): ExecutionTypeEnum {
        return this._executionType
    }

    private _onInteraction?: (commitment: CommitmentBaseModel) => void
    onInteraction() {
        if (!this._onInteraction) {
            console.warn("[NQTR] onInteraction() is not defined for commitmen, so it will not run.", this)
        }
        else {
            this._onInteraction(this)
        }
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
}
