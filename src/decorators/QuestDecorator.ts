import { Quest } from "../classes"

export const registeredQuests: { [id: string]: Quest } = {}

/**
 * Save a quest in the registered quests. If the quest already exists, it will be overwritten.
 * @param quest The quest to save.
 * @returns 
 * @example
 * ```ts
 * saveQuest([mainQuest, aliceQuest, annQuest]);
 * ```
 */
export function saveQuest(quest: Quest | Quest[]) {
    if (Array.isArray(quest)) {
        quest.forEach(c => saveQuest(c))
        return
    }
    if (registeredQuests[quest.id]) {
        console.warn(`[NQTR] Quest id ${quest.id} already exists, it will be overwritten`)
    }
    registeredQuests[quest.id] = quest
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
