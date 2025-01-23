import { OnStartEndStageQuest } from "@drincs/nqtr/dist/override";
import { StageInterface } from "..";
import { QuestsRequiredType } from "../../types";

export default interface StageBaseInterface extends StageBaseInternalInterface {
	// StageInterface
}

export interface StageBaseInternalInterface {
	/**
	 * The function that will be called when the stage starts.
	 */
	readonly onStart?: (stage: StageInterface, props: OnStartEndStageQuest) => void;

	/**
	 * The function that will be called when the stage ends.
	 */
	readonly onEnd?: (stage: StageInterface, props: OnStartEndStageQuest) => void;

	/**
	 * Check if the flag and goals are completed.
	 * You can force the completion of the stage by setting the completed property to true.
	 */
	completed: boolean;

	/**
	 * If the stage is started.
	 */
	started: boolean;

	/**
	 * The day when the stage starts.
	 */
	readonly startDay?: number;

	/**
	 * Check if the stage can start.
	 */
	readonly canStart: boolean;

	/**
	 * The function that will be called when the stage starts.
	 */
	start(props: OnStartEndStageQuest): void;

	/**
	 * The number of days required to start the stage.
	 */
	readonly daysRequiredToStart: number;

	/**
	 * The list of quests required to start the stage.
	 */
	readonly questsRequiredToStart: QuestsRequiredType[];
}
