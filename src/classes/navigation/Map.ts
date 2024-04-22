import { StoredClassModel } from "@drincs/pixi-vn"
import { GraphicItemType } from "../../types/GraphicItem"

const MAP_CATEGORY = "__NQTR-Map__"

export interface MapBaseModelProps<TMap extends MapBaseModel = MapBaseModel> {
    /**
     * The name
     */
    name?: string
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
        super(MAP_CATEGORY, id)
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
        this.setStorageProperty("name", value)
    }

    private defaultImage?: GraphicItemType | { [key: string]: GraphicItemType }
    get image(): GraphicItemType | { [key: string]: GraphicItemType } | undefined {
        return this.getStorageProperty<GraphicItemType>("image") || this.defaultImage
    }
    set image(value: GraphicItemType | { [key: string]: GraphicItemType } | undefined) {
        this.setStorageProperty("image", value)
    }

    private defaultDisabled: boolean
    get disabled(): boolean {
        return this.getStorageProperty<boolean>("disabled") || this.defaultDisabled
    }
    set disabled(value: boolean) {
        this.setStorageProperty("disabled", value)
    }

    private defaultHidden: boolean
    get hidden(): boolean {
        return this.getStorageProperty<boolean>("hidden") || this.defaultHidden
    }
    set hidden(value: boolean) {
        this.setStorageProperty("hidden", value)
    }
}
