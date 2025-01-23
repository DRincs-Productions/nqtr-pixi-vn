import { StoredClassModel } from "@drincs/pixi-vn";
import { StageInterface } from "../../interface";
import { QuestBaseInternalInterface } from "../../interface/quest/QuestInterface";

const QUEST_CATEGORY = "__nqtr-quest__";
export default class QuestStoredClass extends StoredClassModel implements QuestBaseInternalInterface {
	constructor(id: string, private readonly _stages: StageInterface[]) {
		super(QUEST_CATEGORY, id);
	}

	/**
	 * The stages of the quest.
	 */
	get stages(): StageInterface[] {
		return this._stages;
	}

	/**
	 * The index of the current stage.
	 */
	get currentStageIndex(): number | undefined {
		return this.getStorageProperty<number>("currentStageIndex");
	}
	private set currentStageIndex(value: number | undefined) {
		this.setStorageProperty("currentStageIndex", value);
	}
}
