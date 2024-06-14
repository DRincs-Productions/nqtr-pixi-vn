import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override"
import { LocationBaseModel, MapBaseModel } from "../../classes"

export default interface LocationProps<TMap extends MapBaseModel = MapBaseModel> {
    /**
     * The name
     * @default ""
     */
    name?: string
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
    /**
     * The icon element. Can be a string or an Element or a Pixi'VN CanvasItem
     * @default undefined
     */
    renderIcon?: GraphicItemType | Promise<GraphicItemType> | ((location: LocationBaseModel<TMap>, props: OnRenderGraphicItemProps) => GraphicItemType | Promise<GraphicItemType>)
}
