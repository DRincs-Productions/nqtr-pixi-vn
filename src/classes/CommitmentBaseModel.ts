import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override";
import { CharacterInterface, getFlag } from "@drincs/pixi-vn";
import { CommitmentProps } from "../interface";
import { timeTracker } from "../managers";
import CommitmentStoredClass from "./CommitmentStoredClass";
import RoomBaseModel from "./navigation/RoomBaseModel";

const COMMITMENT_CATEGORY = "__nqtr-commitment__"

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
 * })
 * saveCommitment(mcRoom)
 * ```
 */
export default class CommitmentBaseModel<TCharacter extends CharacterInterface = CharacterInterface, TRoom extends RoomBaseModel = RoomBaseModel> extends CommitmentStoredClass {
    /**
     * @param id The id of the commitment, it must be unique.
     * @param character The character or characters that are in the commitment and so in the room.
     * @param room The room where the commitment is.
     * @param props The properties of the commitment.
     */
    constructor(id: string, character: TCharacter | TCharacter[] | undefined, room: TRoom, props: CommitmentProps<TCharacter, TRoom>) {
        super(COMMITMENT_CATEGORY, id)
        this._characters = character ? Array.isArray(character) ? character : [character] : []
        this._room = room
        this._name = props.name || ""
        this.defaultFromHour = props.fromHour
        this.defaultToHour = props.toHour
        this.defaultFromDay = props.fromDay
        this.defaultToDay = props.toDay
        this._renderImage = props.renderImage
        this._executionType = props.executionType || "interaction"
        this._onRun = props.onRun
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._renderIcon = props.renderIcon
        this.defaultPriority = props.priority || 0
    }

    private _name: string
    /**
     * The name
     */
    get name(): string {
        return this._name
    }

    private _renderImage?: GraphicItemType | ((commitment: CommitmentBaseModel<TCharacter, TRoom>, props: OnRenderGraphicItemProps) => GraphicItemType)
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

    private _renderIcon?: GraphicItemType | ((commitment: CommitmentBaseModel, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the icon of the commitment.
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
        if (this.fromDay && this.fromDay > timeTracker.currentDay) {
            return true
        }
        if (!timeTracker.nowIsBetween(this.fromHour, this.toHour)) {
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
}
