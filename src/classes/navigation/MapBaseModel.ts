import { getLocationsByMap } from "../../decorators/RoomDecorator"
import { MapBaseModelProps } from "../../interface"
import { MapBaseInternalInterface } from "../../interface/navigation/MapInterface"
import LocationBaseModel from "./LocationBaseModel"
import MapStoredClass from "./MapStoredClass"

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
export default class MapBaseModel extends MapStoredClass implements MapBaseInternalInterface {
    /**
     * @param id The id of the map, it must be unique.
     * @param props The properties of the map. 
     */
    constructor(id: string, props: MapBaseModelProps = {}) {
        super(id)
        this.defaultName = props.name || ""
        this._image = props.image
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

    private _image?: string
    /**
     * The image of the map.
     */
    get image(): string | undefined {
        return this._image
    }

    /**
     * Get all locations in the map.
     * @returns The locations in the map.
     */
    getLocations<TLocation extends LocationBaseModel = LocationBaseModel>(): TLocation[] {
        return getLocationsByMap<TLocation>(this)
    }
}
