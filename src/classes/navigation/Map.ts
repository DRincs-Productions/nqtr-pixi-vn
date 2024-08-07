import { GraphicItemType, NeighboringMapsInterface, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override"
import { getFlag, StoredClassModel } from "@drincs/pixi-vn"
import { getLocationsByMap } from "../../decorators/RoomDecorator"
import { MapProps } from "../../interface"
import LocationBaseModel from "./Location"

const MAP_CATEGORY = "__nqtr-map__"

/**
 * The base model of a map. I suggest you extend this class to create your own map model.
 * @example
 * ```typescript
 * export const mainMap = new MapBaseModel('main_map', {
 *     name: 'Main Map',
 *     image: "https://image.jpg",
 *     neighboringMaps: {
 *         "north": "atlanta_map_id",
 *         "south": "miami_map_id",
 *         "east": "new_york_map_id",
 *         "west": "los_angeles_map_id"
 *     }
 * });
 * ```
 */
export default class MapBaseModel extends StoredClassModel {
    /**
     * @param id The id of the map, it must be unique.
     * @param props The properties of the map. 
     */
    constructor(id: string, props: MapProps = {}) {
        super(MAP_CATEGORY, id)
        this.defaultName = props.name || ""
        this._renderImage = props.renderImage
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._neighboringMaps = props.neighboringMaps
    }

    private defaultName: string
    /**
     * The name of the map.
     * If you set undefined, it will return the initial value of name.
     */
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string | undefined) {
        this.setStorageProperty("name", value)
    }

    private _renderImage?: GraphicItemType | ((map: MapBaseModel, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the image of the map.
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

    private _neighboringMaps?: NeighboringMapsInterface
    /**
     * The neighboring maps that are available in this map.
     * @example
     * ```ts
     * {
     *     "north": "atlanta_map_id",
     *     "south": "miami_map_id",
     *     "east": "new_york_map_id",
     *     "west": "los_angeles_map_id"
     * }
     * ```
     */
    get neighboringMaps(): NeighboringMapsInterface {
        return this._neighboringMaps || {}
    }
    set neighboringMaps(value: NeighboringMapsInterface | undefined) {
        this._neighboringMaps = value
    }

    /**
     * Get all locations in the map.
     * @returns The locations in the map.
     */
    getLocations<TLocation extends LocationBaseModel = LocationBaseModel>(): TLocation[] {
        return getLocationsByMap<TLocation>(this)
    }
}
