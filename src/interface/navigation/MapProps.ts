import { GraphicItemType, NeighboringMapsInterface, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override"
import { MapBaseModel } from "../../classes"

export default interface MapProps {
    /**
     * The name
     * @default ""
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
     * @default undefined
     */
    renderImage?: GraphicItemType | ((map: MapBaseModel, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The neighboring maps that are available in this map.
     * @example
     * ```ts
     * {
     *    "north": "atlanta_map_id",
     *    "south": "miami_map_id",
     *    "east": "new_york_map_id",
     *    "west": "los_angeles_map_id"
     * }
     * ```
     * @default {}
     */
    neighboringMaps?: NeighboringMapsInterface
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     * @default false
     */
    disabled?: boolean | string
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     * @default false
     */
    hidden?: boolean | string
}
