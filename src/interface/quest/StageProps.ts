import { Goal } from "../../classes"
import { QuestsRequiredType } from "../../types"

export default interface StageProps {
    goals?: Goal[]
    name?: string
    description?: string
    adviceDescription?: string
    image?: string
    daysRequiredToStart?: number
    flagsRequired?: string[]
    questsRequired?: QuestsRequiredType[]
    requestDescription?: string
    onStart?: () => void
    onEnd?: () => void
}
