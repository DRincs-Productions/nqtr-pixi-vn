import { OnStartStageQuest } from "@drincs/nqtr/dist/override";
import { registeredQuests } from "../decorators/QuestDecorator";

/**
 * Start the quests that must start on the current stage.
 */
export function startMustStartStageQuests(props: OnStartStageQuest) {
    Object.entries(registeredQuests).forEach(([_, quest]) => {
        if (quest.currentStageMustStart) {
            quest.startCurrentStage(props)
        }
    })
}
