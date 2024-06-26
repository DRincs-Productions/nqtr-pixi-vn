import { GraphicItemType, OnRenderGraphicItemProps, OnStartEndStageQuest } from "@drincs/nqtr/dist/override"
import Quest from "../../classes/quest/Quest"

export default interface QuestProps {
    /**
     * The name of the quest.
     * @default ""
     */
    name?: string
    /**
     * The description of the quest.
     * @default ""
     */
    description?: string
    /**
     * The icon element. Can be a string or an Element or a Pixi'VN CanvasItem
     * @default undefined
     */
    renderIcon?: GraphicItemType | ((room: Quest, props: OnRenderGraphicItemProps) => GraphicItemType)
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
    renderImage?: GraphicItemType | ((room: Quest, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * If the quest is in development.
     * @default false
     */
    isInDevelopment?: boolean
    /**
     * The function that will be executed when the quest starts.
     */
    onStart?: (quest: Quest, props: OnStartEndStageQuest) => void
    /**
     * The function that will be executed when a stage end in the quest.
     */
    onNextStage?: (quest: Quest, props: OnStartEndStageQuest) => void
}
