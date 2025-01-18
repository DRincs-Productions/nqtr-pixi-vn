import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override";
import { getFlag } from "@drincs/pixi-vn";
import { saveRoom } from "../../decorators";
import { getCurrentRoutine } from "../../functions/RoutineFunctions";
import { LocationInterface, RoomBaseModelProps } from "../../interface";
import CommitmentBaseModel from "../Commitment";
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
 * })
 * saveRoom(mcRoom)
 * ```
 */
export default class RoomBaseModel extends RoomStoredClass {
    /**
     * @param id The id of the room, it must be unique.
     * @param location The location where the room is.
     * @param props The properties of the room.
     */
    constructor(id: string, location: LocationInterface, props: RoomBaseModelProps = {}) {
        super(id, location, props.activities || [])
        this.defaultName = props.name || ""
        this._image = props.image
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._renderIcon = props.renderIcon
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

    private _image?: string
    /**
     * The image of the room.
     */
    get image(): string | undefined {
        return this._image
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
