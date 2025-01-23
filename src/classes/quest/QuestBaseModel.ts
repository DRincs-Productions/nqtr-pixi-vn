import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override";
import { QuestProps, StageInterface } from "../../interface";
import QuestStoredClass from "./QuestStoredClass";

export default class QuestBaseModel extends QuestStoredClass {
	constructor(id: string, stages: StageInterface[], props: QuestProps) {
		super(id, stages, props.onStart, props.onNextStage);
		this._name = props.name || "";
		this._description = props.description || "";
		this._renderIcon = props.renderIcon;
		this._renderImage = props.renderImage;
		this._isInDevelopment = props.isInDevelopment || false;
	}

	private _name: string;
	/**
	 * The name of the quest.
	 */
	get name(): string {
		return this._name;
	}

	private _description: string;
	/**
	 * The description of the quest.
	 */
	get description(): string {
		return this._description;
	}

	private _renderIcon?:
		| GraphicItemType
		| ((room: QuestBaseModel, props: OnRenderGraphicItemProps) => GraphicItemType);
	/**
	 * The function for rendering the icon of the quest.
	 */
	get renderIcon(): ((props: OnRenderGraphicItemProps) => GraphicItemType) | undefined {
		let render = this._renderIcon;
		if (render === undefined) {
			return undefined;
		}
		if (typeof render === "function") {
			return (props: OnRenderGraphicItemProps) => {
				return render(this, props);
			};
		}
		return (props: OnRenderGraphicItemProps) => render;
	}

	private _renderImage?:
		| GraphicItemType
		| ((room: QuestBaseModel, props: OnRenderGraphicItemProps) => GraphicItemType);
	/**
	 * The function for rendering the image of the quest.
	 */
	get renderImage(): ((props: OnRenderGraphicItemProps) => GraphicItemType) | undefined {
		let render = this._renderImage;
		if (render === undefined) {
			return undefined;
		}
		if (typeof render === "function") {
			return (props: OnRenderGraphicItemProps) => {
				return render(this, props);
			};
		}
		return (props: OnRenderGraphicItemProps) => render;
	}

	private _isInDevelopment: boolean;
	/**
	 * If the quest is in development.
	 */
	get isInDevelopment(): boolean {
		return this._isInDevelopment;
	}
}
