import { QuestBaseModel } from "../classes"

export const registeredQuests: { [id: string]: QuestBaseModel } = {}

/**
 * Save a quest in the registered quests. If the quest already exists, it will be overwritten.
 * @param quest The quest to save.
 * @returns 
 * @example
 * ```ts
 * saveQuest([mainQuest, aliceQuest, annQuest]);
 * ```
 */
export function saveQuest<TQuest extends QuestBaseModel = QuestBaseModel>(quest: TQuest | TQuest[]) {
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
export function getQuestById<TQuest extends QuestBaseModel = QuestBaseModel>(id: string): TQuest | undefined {
    try {
        let quest = registeredQuests[id]
        if (!quest) {
            console.error(`[NQTR] Quest ${id} not found`)
            return
        }
        return quest as TQuest
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Quest ${id}`, e)
        return
    }
}
