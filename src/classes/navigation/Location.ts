import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override";
import { getFlag, StoredClassModel } from "@drincs/pixi-vn";
import { getRoomsByLocation } from "../../decorators/RoomDecorator";
import { LocationProps } from "../../interface";
import MapBaseModel from "./MapBaseModel";
import RoomBaseModel from "./Room";

const LOCATION_CATEGORY = "__nqtr-location__"

/**
 * The base model of a location. I suggest you extend this class to create your own location model.
 * @example
 * ```typescript
 * export const mcHome = new LocationBaseModel('mc_home', mainMap, {
 *     name: 'MC Home',
 *     icon: "https://icon.jpg",
 * });
 * ```
 */
export default class LocationBaseModel<TMap extends MapBaseModel = MapBaseModel> extends StoredClassModel {
    /**
     * @param id The id of the location, it must be unique.
     * @param map The map where the location is.
     * @param props The properties of the location.
     */
    constructor(id: string, map: TMap, props: LocationProps<TMap> = {}) {
        super(LOCATION_CATEGORY, id)
        this.defaultName = props.name || ""
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._renderIcon = props.renderIcon
        this._map = map
    }

    private defaultName: string
    /**
     * The name of the location.
     * If you set undefined, it will return the initial value of name.
     */
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string | undefined) {
        this.setStorageProperty("name", value)
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

    private _renderIcon?: GraphicItemType | ((location: LocationBaseModel<TMap>, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the icon of the location.
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

    private _map: TMap
    /**
     * The map where the location is.
     */
    get map(): TMap {
        return this._map
    }

    /**
     * Get the entrance room of the location.
     * You can cast the room to a specific type that extends RoomBaseModel.
     * @returns The entrance room or the first room if there is no entrance.
     * @example
     * ```typescript
     * const entranceHome = new RoomBaseModel("entrance-home", home, { isEntrance: true })
     * saveRoom(entranceHome)
     * const home = new LocationBaseModel("home", map, { name: "Home" })
     * 
     * const entrance = home.getEntrance() // entrance === entranceHome
     * ```
     */
    getEntrance<TRoom extends RoomBaseModel = RoomBaseModel>(): TRoom | undefined {
        let rooms = this.getRooms<TRoom>()
        if (rooms.length === 0) {
            console.error(`[NQTR] The location ${this.id} has no rooms`)
            return
        }
        return rooms.find(room => room.isEntrance) || rooms[0]
    }

    /**
     * Get all rooms in the location.
     * You can cast the rooms to a specific type that extends RoomBaseModel.
     * @returns The rooms in the location.
     */
    getRooms<TRoom extends RoomBaseModel = RoomBaseModel>(): TRoom[] {
        return getRoomsByLocation<TRoom>(this)
    }
}
