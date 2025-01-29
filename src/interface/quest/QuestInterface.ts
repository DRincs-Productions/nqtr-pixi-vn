import { OnStartEndStageQuest, QuestInterface as OverrideQuestInterface } from "@drincs/nqtr/dist/override";
import { QuestInterface as QuestInterfaceInt, StageInterface } from "..";

export default interface QuestInterface extends QuestBaseInternalInterface, OverrideQuestInterface {}

export interface QuestBaseInternalInterface {
    /**
     * The id of the quest.
     */
    readonly id: string;
    /**
     * The stages of the quest.
     */
    readonly stages: StageInterface[];

    /**
     * The index of the current stage.
     */
    currentStageIndex?: number;

    /**
     * The current stage.
     */
    readonly currentStage?: StageInterface;

    /**
     * If the quest is started.
     */
    readonly started: boolean;

    /**
     * If the quest is completed.
     */
    readonly completed: boolean;

    /**
     * If the quest is failed.
     */
    readonly failed: boolean;

    /**
     * The function that will be called when the quest starts.
     */
    readonly onStart?: (stage: QuestInterfaceInt, props: OnStartEndStageQuest) => void;

    /**
     * The function that will be called when the quest goes to the next stage.
     */
    readonly onNextStage?: (stage: QuestInterfaceInt, props: OnStartEndStageQuest) => void;

    /**
     * Start the quest.
     * @param props The properties for the start stage. If you not want to pass any property, you can pass an {}.
     * @returns
     */
    start(props: OnStartEndStageQuest): void;

    /**
     * Go to the next stage if the current stage is completed.
     * If you want to force the change of stage, use goNextStage.
     * @param props The properties. If you not want to pass any property, you can pass an {}.
     * @returns true if the stage was changed, false otherwise.
     */
    tryToGoNextStage(props: OnStartEndStageQuest): boolean;

    /**
     * Complete the current stage and go to the next stage.
     * If you want to go to the next stage only if the current stage is completed, use tryToGoNextStage.
     * @param props The properties. If you not want to pass any property, you can pass an {}.
     * @returns true if the stage was changed, false otherwise.
     */
    completeCurrentStageAndGoNext(props: OnStartEndStageQuest): boolean;

    /**
     * Go to the next stage without checking if the current stage is completed.
     * If you want to go to the next stage only if the current stage is completed, use tryToGoNextStage.
     * @param props The properties. If you not want to pass any property, you can pass an {}.
     * @returns returns true if the stage was changed, false otherwise.
     */
    goNextStage(props: OnStartEndStageQuest): boolean;

    /**
     * If the current stage must start. It is true if the current stage is not started, can start and not completed.
     */
    readonly currentStageMustStart: boolean;

    /**
     * Start the current stage.
     * @param props The properties for the start stage. If you not want to pass any property, you can pass an {}.
     */
    startCurrentStage(props: OnStartEndStageQuest): void;
}
