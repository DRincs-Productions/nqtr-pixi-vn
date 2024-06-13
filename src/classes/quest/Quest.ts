import { GraphicItemType, OnRenderGraphicItemProps } from "@drincs/nqtr/dist/override";
import { StoredClassModel } from "@drincs/pixi-vn";
import { QuestProps } from "../../interface";
import StageBaseModel from "./Stage";

const QUEST_CATEGORY = "__nqtr-quest__"

export default class QuestBaseModel<TStage extends StageBaseModel = StageBaseModel> extends StoredClassModel {
    constructor(id: string, stages: TStage[], props: QuestProps) {
        super(QUEST_CATEGORY, id)
        this._stages = stages
        this._name = props.name || ""
        this._description = props.description || ""
        this._renderIcon = props.renderIcon || ""
        this._renderImage = props.renderImage || ""
        this._isInDevelopment = props.isInDevelopment || false
    }
    private _stages: TStage[]
    get stages(): TStage[] {
        return this._stages
    }

    private _name: string
    get name(): string {
        return this._name
    }

    private _description: string
    get description(): string {
        return this._description
    }

    private _renderIcon?: GraphicItemType | ((room: QuestBaseModel<TStage>, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the icon of the quest.
     */
    get renderIcon(): ((props: OnRenderGraphicItemProps) => GraphicItemType) | undefined {
        let render = this._renderIcon
        if (render === undefined) {
            return undefined
        }
        if (typeof render === "function") {
            return (props: OnRenderGraphicItemProps) => {
                return render(this, props)
            }
        }
        return (props: OnRenderGraphicItemProps) => render
    }

    private _renderImage?: GraphicItemType | ((room: QuestBaseModel<TStage>, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The function for rendering the image of the quest.
     */
    get renderImage(): ((props: OnRenderGraphicItemProps) => GraphicItemType) | undefined {
        let render = this._renderImage
        if (render === undefined) {
            return undefined
        }
        if (typeof render === "function") {
            return (props: OnRenderGraphicItemProps) => {
                return render(this, props)
            }
        }
        return (props: OnRenderGraphicItemProps) => render
    }

    private _isInDevelopment: boolean
    get isInDevelopment(): boolean {
        return this._isInDevelopment
    }

    get currentStageIndex(): number | undefined {
        return this.getStorageProperty<number>('currentStageIndex')
    }
    private set currentStageIndex(value: number | undefined) {
        this.setStorageProperty('currentStageIndex', value)
    }

    get currentStage(): TStage | undefined {
        let index = this.currentStageIndex
        if (index === undefined || index >= this.stages.length) {
            return undefined
        }
        return this.stages[index]
    }

    get started(): boolean {
        return this.currentStageIndex !== undefined
    }

    get completed(): boolean {
        return this.currentStageIndex === this.stages.length
    }
}
