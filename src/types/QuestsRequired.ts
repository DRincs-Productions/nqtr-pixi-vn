import { QuestBaseModel } from "../classes/quest";

export type QuestsRequiredType<TQuest extends QuestBaseModel = QuestBaseModel> = { quest: TQuest, stageNumber: number } | TQuest
