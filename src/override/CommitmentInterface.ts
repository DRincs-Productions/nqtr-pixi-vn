export default interface CommitmentInterface {
	/**
	 * The name of the commitment.
	 */
	readonly name: string;
	/**
	 * The image of the commitment.
	 */
	readonly image: string;
	/**
	 * The icon of the commitment.
	 */
	readonly icon: string;
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
}
