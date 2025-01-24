export default interface ActivityInterface {
	/**
	 * The name of the activity.
	 */
	name: string;
	/**
	 * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
	 */
	get disabled(): boolean;
	/**
	 * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
	 */
	set disabled(value: boolean | string);
	/**
	 * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
	 */
	get hidden(): boolean;
	/**
	 * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
	 */
	set hidden(value: boolean | string);
	/**
	 * The icon of the activity.
	 */
	readonly icon: string | undefined;
}
