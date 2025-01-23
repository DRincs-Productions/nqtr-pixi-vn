export default interface QuestInterface {
	/**
	 * The name of the quest.
	 */
	readonly name: string;
	/**
	 * The description of the quest.
	 */
	readonly description: string;
	/**
	 * The function for rendering the icon of the quest.
	 */
	readonly icon?: string;
	/**
	 * The function for rendering the image of the quest.
	 */
	readonly image?: string;
	/**
	 * If the quest is in development.
	 */
	readonly inDevelopment: boolean;
}
