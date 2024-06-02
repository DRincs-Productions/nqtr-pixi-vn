import { QuestBaseModel } from "../classes";

export type QuestsRequiredType<TQuest extends QuestBaseModel = QuestBaseModel> = { quest: TQuest, stageNumber: number } | TQuest
