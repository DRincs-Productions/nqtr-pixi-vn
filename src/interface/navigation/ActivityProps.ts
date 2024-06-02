import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override"
import { ActivityStoredAbstract } from "../../classes/ActivityStoredAbstract"

export default interface ActivityProps {
    /**
     * The name
     * @default ""
     */
    name?: string
    /**
     * The hour when the activity starts. If the activity is not started yet, it will be hidden.
     * If you set 3, the activity will be hidden into hours 1 and 2, and will be shown from hour 3.
     * @default TimeManager.minDayHours
     */
    fromHour?: number
    /**
     * The hour when the activity ends. If the activity is ended yet, it will be hidden.
     * If you set 3, the activity will be shown into hours 1 and 2 and will be hidden from hour 3.
     * @default TimeManager.maxDayHours + 1
     */
    toHour?: number
    /**
     * The day when the activity starts. If the activity is not started yet, it will be hidden.
     * If you set 3, the activity will be hidden into days 1 and 2, and will be shown from day 3.
     * @default undefined
     */
    fromDay?: number
    /**
     * The day when the activity ends. If the activity is ended yet, it will be deleted or hidden.
     * If you set 3, the activity will be shown into days 1 and 2 and will be deleted or hidden from day 3.
     * @default undefined
     */
    toDay?: number
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
    renderIcon?: GraphicItemType | ((activity: ActivityStoredAbstract, props: OnRenderGraphicItemProps) => GraphicItemType)
}
