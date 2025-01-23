import { QuestInterface } from "../interface";

export const registeredQuests: { [id: string]: QuestInterface } = {};

/**
 * Save a quest in the registered quests. If the quest already exists, it will be overwritten.
 * @param id The id of the quest, it must be unique
 * @param stages The stages of the quest
 * @param props The quest properties
 * @returns The created quest
 */
export function saveQuest(quest: QuestInterface | QuestInterface[]) {
	if (Array.isArray(quest)) {
		quest.forEach((c) => saveQuest(c));
		return;
	}
	if (registeredQuests[quest.id]) {
		console.warn(`[NQTR] Quest id ${quest.id} already exists, it will be overwritten`);
	}
	registeredQuests[quest.id] = quest;
}

/**
 * Get a quest by its id.
 * @param id The id of the quest.
 * @returns The quest or undefined if not found.
 */
export function getQuestById(id: string): QuestInterface | undefined {
	try {
		let quest = registeredQuests[id];
		if (!quest) {
			console.error(`[NQTR] Quest ${id} not found`);
			return;
		}
		return quest;
	} catch (e) {
		console.error(`[NQTR] Error while getting Quest ${id}`, e);
		return;
	}
}

/**
 * Get all registered quests and started.
 * @returns All registered quests.
 */
export function getAllStartedQuests(): QuestInterface[] {
	return Object.values(registeredQuests).filter((quest) => quest.started);
}
