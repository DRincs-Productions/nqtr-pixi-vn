export default interface ActivityInterface {
	/**
	 * The name of the activity.
	 */
	name: string;
	/**
	 * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
	 */
	disabled: boolean;
	/**
	 * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
	 */
	hidden: boolean;
	/**
	 * The icon of the activity.
	 */
	readonly icon: string | undefined;
}
