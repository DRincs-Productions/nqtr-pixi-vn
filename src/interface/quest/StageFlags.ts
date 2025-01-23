export default interface StageFlags {
	/**
	 * The id of the stage.
	 */
	readonly id: string;
	/**
	 * The flag for checking if the condition is met.
	 */
	flag: string;
	/**
	 * The description of the flag.
	 */
	description: string;
}
