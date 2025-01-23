import StageFlags from "../interface/quest/StageFlags";

export default interface StageInterface {
	/**
	 * The name of the stage.
	 */
	readonly name: string;

	/**
	 * The description of the stage.
	 */
	readonly description: string;

	/**
	 * The advice description of the stage.
	 */
	readonly adviceDescription: string;

	/**
	 * The image of the stage.
	 */
	readonly image?: string;

	/**
	 * The list of flags that the player must complete to finish the stage.
	 */
	readonly flags: StageFlags[];

	/**
	 * The list of flags required to start the stage.
	 */
	readonly flagsRequiredToStart: StageFlags[];

	/**
	 * The description of the request to start the stage.
	 */
	readonly requestDescriptionToStart: string;
}
