import { OnRunProps } from "@drincs/nqtr";
import { getQuestById, registeredQuests } from "../decorators/QuestDecorator";
import { QuestInterface } from "../interface";

export default class QuestManager {
    get quests(): QuestInterface[] {
        return Object.values(registeredQuests);
    }
    get startedQuests(): QuestInterface[] {
        return this.quests.filter((quest) => quest.started);
    }
    get inProgressQuests(): QuestInterface[] {
        return this.quests.filter((quest) => quest.inProgress);
    }
    get completedQuests(): QuestInterface[] {
        return this.quests.filter((quest) => quest.completed);
    }
    get failedQuests(): QuestInterface[] {
        return this.quests.filter((quest) => quest.failed);
    }
    get notStartedQuests(): QuestInterface[] {
        return this.quests.filter((quest) => !quest.started);
    }

    find(id: string): QuestInterface | undefined {
        return getQuestById(id);
    }

    /**
     * Start the quests that must start on the current stage.
     */
    startsStageMustBeStarted(props: OnRunProps) {
        Object.values(registeredQuests).forEach((quest) => {
            if (quest.currentStageMustStart) {
                quest.startCurrentStage(props);
            }
        });
    }
}
