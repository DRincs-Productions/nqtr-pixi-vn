import { getFlag, StoredClassModel } from "@drincs/pixi-vn"
import { getLocationsByMap } from "../../decorators/RoomDecorator"
import { GraphicItemType } from "../../types/GraphicItem"
import LocationBaseModel from "./Location"

const MAP_CATEGORY = "__nqtr-map__"

export interface MapBaseModelProps<TMap extends MapBaseModel = MapBaseModel> {
    /**
     * The name
     */
    name?: string
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
     * The neighboring maps that are available in this map.
     * @example
     * ```ts
     * {
     *    "north": atlantaMap,
     *    "south": miamiMap,
     *    "east": savannahMap,
     *    "west": birminghamMap
     * }
     * ```
     */
    neighboringMaps?: { [key: string]: TMap }
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     */
    disabled?: boolean | string
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     */
    hidden?: boolean | string
}

/**
 * The base model of a map. I suggest you extend this class to create your own map model.
 * @example
 * ```typescript
 * export const mainMap = new MapBaseModel('main_map', {
 *     name: 'Main Map',
 *     image: "https://image.jpg",
 *     neighboringMaps: {
 *         "north": northMap,
 *         "south": southMap,
 *         "east": eastMap,
 *         "west": westMap
 *     }
 * });
 * ```
 */
export default class MapBaseModel extends StoredClassModel {
    /**
     * @param id The id of the map, it must be unique.
     * @param props The properties of the map. 
     */
    constructor(id: string, props: MapBaseModelProps = {}) {
        super(MAP_CATEGORY, id)
        this.defaultName = props.name || ""
        this.defaultImage = props.image
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
    }

    private defaultName: string
    /**
     * The name of the map.
     * If you set undefined, it will return the default name.
     */
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string | undefined) {
        this.setStorageProperty("name", value)
    }

    private defaultImage?: GraphicItemType | { [key: string]: GraphicItemType }
    /**
     * The image of the map. It can be a string, an Element or a Pixi'VN Canvas Item.
     * If you set undefined, it will return the default image.
     */
    get image(): GraphicItemType | { [key: string]: GraphicItemType } | undefined {
        return this.getStorageProperty<GraphicItemType>("image") || this.defaultImage
    }
    set image(value: GraphicItemType | { [key: string]: GraphicItemType } | undefined) {
        this.setStorageProperty("image", value)
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

    /**
     * Get all locations in the map.
     * @returns The locations in the map.
     */
    getLocations<TLocation extends LocationBaseModel = LocationBaseModel>(): TLocation[] {
        return getLocationsByMap<TLocation>(this)
    }
}
