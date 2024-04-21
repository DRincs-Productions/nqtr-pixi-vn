import { StoredClassModel } from "@drincs/pixi-vn"

const MAP_PREFIX = "__NQTR-Map__"

export interface MapBaseModelProps<TMap extends MapBaseModel = MapBaseModel> {
    /**
     * The name
     */
    name?: string
    /**
     * The image. Can be a string or an object with keys for different screen sizes.
     * Then define it as an object in order to manage multiple images, for example to have a image based on time.
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
    image?: string | { [key: string]: string }
    /**
     * The neighboring maps that are available.
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
     * Whether is disabled
     */
    disabled?: boolean
    /**
     * Whether is hidden
     */
    hidden?: boolean
}

export default class MapBaseModel extends StoredClassModel {
    constructor(id: string, props: MapBaseModelProps) {
        super(MAP_PREFIX + id)
        this.defaultName = props.name || ""
        this.defaultImage = props.image
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

    private defaultImage?: string | { [key: string]: string }
    get image(): string | { [key: string]: string } | undefined {
        return this.getStorageProperty<string>("image") || this.defaultImage
    }
    set image(value: string | { [key: string]: string } | undefined) {
        this.updateStorageProperty("image", value)
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
