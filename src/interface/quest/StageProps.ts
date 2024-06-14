import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override"
import { Goal, Stage } from "../../classes"
import { QuestsRequiredType } from "../../types"

export default interface StageProps {
    goals?: Goal[]
    flags?: string[]
    name?: string
    description?: string
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
    daysRequiredToStart?: number
    flagsRequired?: string[]
    questsRequired?: QuestsRequiredType[]
    requestDescription?: string
    onStart?: () => Promise<void> | void
    onEnd?: () => Promise<void> | void
}
