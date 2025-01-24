import { OnStartEndStageQuest } from "@drincs/nqtr/dist/override";
import { StoredClassModel } from "@drincs/pixi-vn";
import { StageInterface } from "../../interface";
import { StageBaseInternalInterface } from "../../interface/quest/StageInterface";
import { timeTracker } from "../../managers";
import { QuestsRequiredType } from "../../types";

const STAGE_CATEGORY = "__nqtr-stage__";
export default class StageStoredClass extends StoredClassModel implements StageBaseInternalInterface {
	constructor(
		id: string,
		options: {
			/**
			 * The function that will be executed when the stage starts.
			 */
			onStart?: (stage: StageInterface, props: OnStartEndStageQuest) => void;
			/**
			 * The function that will be executed when the stage ends.
			 */
			onEnd?: (stage: StageInterface, props: OnStartEndStageQuest) => void;
			/**
			 * The day required to start the stage.
			 * @example If the value is 3, and the previous stage ends on day 1, the stage will start on day 4.
			 */
			daysRequiredToStart?: number;
			/**
			 * The quests required to start the stage.
			 * @default []
			 */
			questsRequiredToStart?: QuestsRequiredType[];
		} = {}
	) {
		super(STAGE_CATEGORY, id);
		this._onStart = options.onStart;
		this._onEnd = options.onEnd;
		this._daysRequiredToStart = options.daysRequiredToStart;
		this._questsRequiredToStart = options.questsRequiredToStart || [];
	}

	private _onStart?: (stage: StageInterface, props: OnStartEndStageQuest) => void;
	get onStart(): undefined | ((stage: StageInterface, props: OnStartEndStageQuest) => void) {
		return this._onStart;
	}

	private _onEnd?: (stage: StageInterface, props: OnStartEndStageQuest) => void;
	get onEnd(): undefined | ((stage: StageInterface, props: OnStartEndStageQuest) => void) {
		return this._onEnd;
	}

	get completed(): boolean {
		return this.getStorageProperty<boolean>("completed") || false;
	}
	set completed(value: boolean) {
		this.setStorageProperty("completed", value);
	}

	get started(): boolean {
		return this.getStorageProperty<boolean>("started") || false;
	}
	set started(value: boolean) {
		this.setStorageProperty("started", value);
	}

	private get prevStageEndDay(): number | undefined {
		return this.getStorageProperty<number>("prevStageEndDay");
	}
	private set prevStageEndDay(value: number | undefined) {
		this.setStorageProperty("prevStageEndDay", value);
	}

	get startDay(): number | undefined {
		let prevStageEndDay = this.prevStageEndDay;
		if (prevStageEndDay === undefined) {
			return undefined;
		}
		return prevStageEndDay + this.daysRequiredToStart;
	}

	get canStart(): boolean {
		let daysRequired = this.daysRequiredToStart;
		if (daysRequired > 0) {
			let prevStageEndDay = this.prevStageEndDay;
			if (prevStageEndDay === undefined) {
				return false;
			}
			if (prevStageEndDay + daysRequired > timeTracker.currentDay) {
				return false;
			}
		}
		if (
			this.questsRequiredToStart.length > 0 &&
			!this.questsRequiredToStart.every(
				(q) => q.quest.currentStageIndex && q.quest.currentStageIndex >= q.stageNumber
			)
		) {
			return false;
		}
		return true;
	}

	inizialize() {
		if (this.daysRequiredToStart > 0) {
			this.prevStageEndDay = timeTracker.currentDay;
			console.log(`[NQTR] Stage ${this.id} will start on day ${this.startDay}`);
		}
	}

	start(props: OnStartEndStageQuest) {
		if (this.canStart) {
			this.started = true;
			if (this.onStart) {
				this.onStart(this as any as StageInterface, props);
			}
		} else {
			console.warn(`[NQTR] Stage ${this.id} can't start`);
		}
	}

	private _daysRequiredToStart?: number;
	get daysRequiredToStart(): number {
		return this._daysRequiredToStart || 0;
	}

	private _questsRequiredToStart: QuestsRequiredType[];
	get questsRequiredToStart(): QuestsRequiredType[] {
		return this._questsRequiredToStart || [];
	}
}
