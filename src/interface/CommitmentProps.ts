import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override"
import { CommitmentInterface } from "."
import { CommitmentBaseModel } from "../classes"
import { ExecutionType } from "../types"
import { OnRunEvent } from "../types/OnRunEvent"

export default interface CommitmentProps {
    /**
     * The name
     * @default ""
     */
    name?: string
    /**
     * The hour when the commitment starts. If the commitment is not started yet, it will be hidden.
     * If you set 3, the commitment will be hidden into hours 1 and 2, and will be shown from hour 3.
     * @default timeTracker.minDayHours
     */
    fromHour?: number
    /**
     * The hour when the commitment ends. If the commitment is ended yet, it will be hidden.
     * If you set 3, the commitment will be shown into hours 1 and 2 and will be hidden from hour 3.
     * @default timeTracker.maxDayHours + 1
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
     * The image ofthe Commitment.
     */
    image?: string
    /**
     * Execution type. If is "automatic" the onRun() runned automatically when the palayer is in the room. If is "interaction" the player must interact with the character to run the onRun() function.
     * If you set "automatic" remember to remove the commitment when it is no longer needed, because otherwise it repeats itself every time.
     * @default "interaction"
     */
    executionType?: ExecutionType
    /**
     * Is a function that is called when the player interacts with the character.
     * @param commitment 
     * @returns 
     * @default undefined
     */
    onRun?: OnRunEvent<CommitmentInterface>
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
    /**
     * The icon element. Can be a string or an Element or a Pixi'VN CanvasItem
     * @default undefined
     */
    renderIcon?: GraphicItemType | ((commitment: CommitmentBaseModel, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The priority. The higher the number, the higher the priority.
     * To ensure that a character is not in 2 places at the same time, if there are 2 or more valid commits at the same time and with the same character, the one with the highest priority will be chosen.
     * @default 0
     */
    priority?: number
}
