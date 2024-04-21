import { CharacterModelBase, StoredClassModel } from "@drincs/pixi-vn";
import { ExecutionTypeEnum } from "../enums/ExecutionTypeEnum";
import { GraphicItemType } from "../types/GraphicItem";
import { RoomBaseModel } from "./navigation";

const COMMITMENT_PREFIX = "__NQTR-Commitment__"

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
     * Whether is disabled
     */
    disabled?: boolean
}

export default class CommitmentBaseModel<TCharacter extends CharacterModelBase = CharacterModelBase, TRoom extends RoomBaseModel = RoomBaseModel> extends StoredClassModel {
    constructor(id: string, character: TCharacter | TCharacter[], room: TRoom, props: CommitmentBaseModelProps) {
        super(COMMITMENT_PREFIX + id)
        this._characters = Array.isArray(character) ? character : [character]
        this._room = room
        this._name = props.name || ""
        this._startHour = props.startHour
        this._endHour = props.endHour
        this._image = props.image
        this._endDay = props.endDay
        this._executionType = props.executionType || ExecutionTypeEnum.INTERACTION
        this._onInteraction = props.onInteraction
        this._disabled = props.disabled || false
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
        return this._startHour || 0
    }

    private _endHour?: number
    get endHour(): number {
        return this._endHour || 0
    }

    private _image?: GraphicItemType | { [key: string]: GraphicItemType }
    get image(): GraphicItemType | { [key: string]: GraphicItemType } | undefined {
        return this._image
    }

    private _endDay?: number
    get endDay(): number {
        return this._endDay || 0
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

    private _disabled: boolean
    get disabled(): boolean {
        return this._disabled
    }
}
