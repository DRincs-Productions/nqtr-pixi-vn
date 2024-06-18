import { Stage } from "../classes"
import Quest from "../classes/quest/Quest"
import { QuestProps } from "../interface"

export const registeredQuests: { [id: string]: Quest } = {}

/**
 * Creates a new quest and registers it in the system.
 * **This function must be called at least once at system startup to register the quest, otherwise the system cannot be used.**
 * @param id The id of the quest, it must be unique
 * @param stages The stages of the quest
 * @param onStepRun is a function that will be executed before any step is executed, is useful for example to make sure all images used have been cached
 * @returns The created quest
 */
export function newQuest(id: string, stages: Stage[], props: QuestProps): Quest {
    if (registeredQuests[id]) {
        console.warn(`[NQTR] Quest ${id} already exists, it will be overwritten`)
    }
    let quest = new Quest(id, stages, props)
    registeredQuests[id] = quest
    return quest
}

/**
 * Get a quest by its id.
 * @param id The id of the quest.
 * @returns The quest or undefined if not found.
 */
export function getQuestById(id: string): Quest | undefined {
    try {
        let quest = registeredQuests[id]
        if (!quest) {
            console.error(`[NQTR] Quest ${id} not found`)
            return
        }
        return quest
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Quest ${id}`, e)
        return
    }
}
