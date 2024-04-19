import { StoredClassModel } from "@drincs/pixi-vn"

const MAP_PREFIX = "__NQTR-Map__"

export interface MapBaseModelProps<TMap extends MapBaseModel = MapBaseModel> {
    /**
     * The name of the location
     */
    name?: string
    /**
     * The background of the map. Can be a string or an object with keys for different screen sizes.
     * Then define it as an object in order to manage multiple backgrounds, for example to have a background based on time.
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
    background?: string | { [key: string]: string }
    /**
     * The maps that are available in this location.
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
     * Whether the map is disabled
     */
    disabled?: boolean
    /**
     * Whether the map is hidden
     */
    hidden?: boolean
}

export default class MapBaseModel extends StoredClassModel {
    constructor(id: string, props: MapBaseModelProps) {
        super(MAP_PREFIX + id)
        this.defaultName = props.name || ""
        this.defaultBackground = props.background
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
    }

    private defaultName: string
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string) {
        this.updateStorageProperty("name", value)
    }

    private defaultBackground?: string | { [key: string]: string }
    get background(): string | { [key: string]: string } | undefined {
        return this.getStorageProperty<string>("background") || this.defaultBackground
    }
    set background(value: string | { [key: string]: string } | undefined) {
        this.updateStorageProperty("background", value)
    }

    private defaultDisabled: boolean
    get disabled(): boolean {
        return this.getStorageProperty<boolean>("disabled") || this.defaultDisabled
    }
    set disabled(value: boolean) {
        this.updateStorageProperty("disabled", value)
    }

    private defaultHidden: boolean
    get hidden(): boolean {
        return this.getStorageProperty<boolean>("hidden") || this.defaultHidden
    }
    set hidden(value: boolean) {
        this.updateStorageProperty("hidden", value)
    }
}
