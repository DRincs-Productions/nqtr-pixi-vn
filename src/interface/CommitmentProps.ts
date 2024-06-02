import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override"
import { CharacterBaseModel } from "@drincs/pixi-vn"
import { CommitmentBaseModel } from "../classes"
import { RoomBaseModel } from "../classes/navigation"
import { ExecutionTypeEnum } from "../enums"

export default interface CommitmentProps<TCharacter extends CharacterBaseModel = CharacterBaseModel, TRoom extends RoomBaseModel = RoomBaseModel> {
    /**
     * The name
     * @default ""
     */
    name?: string
    /**
     * The hour when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set 3, the commitment will be hidden into hours 1 and 2, and will be shown from hour 3.
     * @default TimeManager.minDayHours
     */
    fromHour?: number
    /**
     * The hour when the commitment ends. If the commitment is ended yet, it will be hidden.
     * If you set 3, the commitment will be shown into hours 1 and 2 and will be hidden from hour 3.
     * @default TimeManager.maxDayHours + 1
     */
    toHour?: number
    /**
     * The day when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set 3, the commitment will be hidden into days 1 and 2, and will be shown from day 3.
     * @default undefined
     */
    fromDay?: number
    /**
     * The day when the commitment ends. If the commitment is ended yet, it will be deleted or hidden.
     * If you set 3, the commitment will be shown into days 1 and 2 and will be deleted or hidden from day 3.
     * @default undefined
     */
    toDay?: number
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
    renderImage?: GraphicItemType | ((commitment: CommitmentBaseModel<TCharacter, TRoom>, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * Execution type. If is "automatic" the onRun() runned automatically when the palayer is in the room. If is "interaction" the player must interact with the character to run the onRun() function.
     * @default ExecutionTypeEnum.INTERACTION
     */
    executionType?: ExecutionTypeEnum
    /**
     * Is a function that is called when the player interacts with the character.
     * @param commitment 
     * @returns 
     * @default undefined
     */
    onRun?: (commitment: CommitmentBaseModel) => void
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     * If it is disabled this commitment will not be taken into consideration. So the characters will not be in the room, but will be busy with other commitments.
     * @default false
     */
    disabled?: boolean | string
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     * @default false
     */
    hidden?: boolean | string
}
