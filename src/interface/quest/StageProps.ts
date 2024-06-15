import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override"
import { Goal, Stage } from "../../classes"
import { QuestsRequiredType } from "../../types"
import StageFlags from "./StageFlags"

export default interface StageProps {
    /**
     * The goals of the stage.
     * @default []
     */
    goals?: Goal[]
    /**
     * The flags of the stage.
     * @default []
     */
    flags?: StageFlags[]
    /**
     * The name of the stage.
     * @default ""
     */
    name?: string
    /**
     * The description of the stage.
     * @default ""
     */
    description?: string
    /**
     * The advice description of the stage.
     * @default ""
     */
    adviceDescription?: string
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
    renderImage?: GraphicItemType | ((room: Stage, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The day required to start the stage.
     * @example If the value is 3, and the previous stage ends on day 1, the stage will start on day 4.
     */
    daysRequiredToStart?: number
    /**
     * The flags required to start the stage.
     * @default []
     */
    flagsRequired?: StageFlags[]
    /**
     * The quests required to start the stage.
     * @default []
     */
    questsRequired?: QuestsRequiredType[]
    /**
     * The description to request to start the stage.
     * @default ""
     */
    requestDescription?: string
    /**
     * The function that will be executed when the stage starts.
     */
    onStart?: () => void
    /**
     * The function that will be executed when the stage ends.
     */
    onEnd?: () => void
}
