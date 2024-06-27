import { GraphicItemType, OnEndStageQuest, OnRenderGraphicItemProps, OnStartStageQuest } from "@drincs/nqtr/dist/override";
import { StoredClassModel } from "@drincs/pixi-vn";
import { QuestProps } from "../../interface";
import Stage, { StageQuest } from "./Stage";

const QUEST_CATEGORY = "__nqtr-quest__"

export default class Quest extends StoredClassModel {
    constructor(id: string, stages: Stage[], props: QuestProps) {
        super(QUEST_CATEGORY, id)
        this._stages = stages
        this._name = props.name || ""
        this._description = props.description || ""
        this._renderIcon = props.renderIcon
        this._renderImage = props.renderImage
        this._isInDevelopment = props.isInDevelopment || false
        this._onStart = props.onStart
        this._onNextStage = props.onNextStage
    }

    private _stages: Stage[]
    /**
     * The stages of the quest.
     */
    get stages(): StageQuest[] {
        return this._stages.map((stage, index) => {
            return new StageQuest(stage.id, stage)
        })
    }

    private _name: string
    /**
     * The name of the quest.
     */
    get name(): string {
        return this._name
    }

    private _description: string
    /**
     * The description of the quest.
     */
    get description(): string {
        return this._description
    }

    private _renderIcon?: GraphicItemType | ((room: Quest, props: OnRenderGraphicItemProps) => GraphicItemType)
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

    private _renderImage?: GraphicItemType | ((room: Quest, props: OnRenderGraphicItemProps) => GraphicItemType)
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
    /**
     * If the quest is in development.
     */
    get isInDevelopment(): boolean {
        return this._isInDevelopment
    }

    /**
     * The index of the current stage.
     */
    get currentStageIndex(): number | undefined {
        return this.getStorageProperty<number>('currentStageIndex')
    }
    private set currentStageIndex(value: number | undefined) {
        this.setStorageProperty('currentStageIndex', value)
    }

    /**
     * The current stage.
     */
    get currentStage(): StageQuest | undefined {
        let index = this.currentStageIndex
        if (index === undefined || index >= this.stages.length) {
            return undefined
        }
        return this.stages[index]
    }

    /**
     * If the quest is started.
     */
    get started(): boolean {
        return this.currentStageIndex !== undefined
    }

    /**
     * If the quest is completed.
     */
    get completed(): boolean {
        if (this.currentStageIndex === undefined) {
            return false
        }
        return this.currentStageIndex > this.stages.length - 1
    }

    private _onStart?: (stage: Quest, props: OnStartStageQuest) => void
    /**
     * The function that will be called when the quest starts.
     */
    get onStart(): undefined | ((props: OnStartStageQuest) => void) {
        let onStart = this._onStart
        if (onStart === undefined) {
            return undefined
        }
        return (props: OnStartStageQuest) => onStart(this, props)
    }

    private _onNextStage?: (stage: Quest, props: OnEndStageQuest) => void
    /**
     * The function that will be called when the quest goes to the next stage.
     */
    get onNextStage(): undefined | ((props: OnEndStageQuest) => void) {
        let onNext = this._onNextStage
        if (onNext === undefined) {
            return undefined
        }
        return (props: OnEndStageQuest) => onNext(this, props)
    }

    /**
     * Start the quest.
     * @param props The properties for the start stage. If you not want to pass any property, you can pass an {}.
     * @returns 
     */
    start(props: OnStartStageQuest): void {
        if (this.started) {
            console.warn(`[NQTR] Quest ${this.id} is already started`)
            return
        }
        if (this.stages.length === 0) {
            console.error(`[NQTR] Quest ${this.id} has no stages`)
            return
        }
        this.currentStageIndex = 0
        let currentStage = this.currentStage
        if (currentStage && currentStage.start) {
            this.onStart && this.onStart(props)
            return currentStage.start(props)
        }
        else {
            console.error(`[NQTR] Quest ${this.id} has no start stage`)
        }
    }

    /**
     * Go to the next stage if the current stage is completed.
     * If you want to force the change of stage, use goNextStage.
     * @param startProps The properties for the start stage. If you not want to pass any property, you can pass an {}.
     * @param endProps The properties for the end stage. If you not want to pass any property, you can pass an {}.
     * @returns true if the stage was changed, false otherwise.
     */
    tryToGoNextStage(
        startProps: OnStartStageQuest,
        endProps: OnEndStageQuest
    ): boolean {
        if (!this.started) {
            return false
        }
        if (this.completed) {
            return false
        }
        let currentStage = this.currentStage
        if (!currentStage) {
            console.error(`[NQTR] Quest ${this.id} has no current stage`)
            return false
        }
        if (currentStage.completed) {
            return this.goNextStage(startProps, endProps)
        }
        return false
    }

    /**
     * Complete the current stage and go to the next stage.
     * If you want to go to the next stage only if the current stage is completed, use tryToGoNextStage.
     * @param startProps The properties for the start stage. If you not want to pass any property, you can pass an {}.
     * @param endProps The properties for the end stage. If you not want to pass any property, you can pass an {}.
     * @returns true if the stage was changed, false otherwise.
     */
    completeCurrentStageAndGoNext(
        startProps: OnStartStageQuest,
        endProps: OnEndStageQuest
    ): boolean {
        let currentStage = this.currentStage
        if (!currentStage) {
            console.error(`[NQTR] Quest ${this.id} has no current stage`)
            return false
        }
        currentStage.completed = true
        return this.goNextStage(startProps, endProps)
    }

    /**
     * Go to the next stage without checking if the current stage is completed.
     * If you want to go to the next stage only if the current stage is completed, use tryToGoNextStage.
     * @param startProps 
     * @param endProps 
     * @returns returns true if the stage was changed, false otherwise.
     */
    goNextStage(
        startProps: OnStartStageQuest,
        endProps: OnEndStageQuest
    ): boolean {
        if (!this.started) {
            console.warn(`[NQTR] Quest ${this.id} is not started`)
            return false
        }
        if (this.completed) {
            console.warn(`[NQTR] Quest ${this.id} is already completed`)
            return false
        }
        let prevStage = this.currentStage
        let currentStageIndex = this.currentStageIndex
        if (!prevStage || currentStageIndex === undefined) {
            console.error(`[NQTR] Quest ${this.id} has no current stage`)
            return false
        }
        this.currentStageIndex = currentStageIndex + 1
        this.onNextStage && this.onNextStage(endProps)
        if (prevStage && prevStage.onEnd) {
            prevStage.onEnd(endProps)
        }
        let nextCurrentStage = this.currentStage
        if (nextCurrentStage) {
            nextCurrentStage.inizialize()
            if (this.currentStageMustStart) {
                this.startCurrentStage(startProps)
            }
        }

        return true
    }

    /**
     * If the current stage must start. It is true if the current stage is not started, can start and not completed.
     */
    get currentStageMustStart(): boolean {
        let currentStage = this.currentStage
        if (!currentStage) {
            return false
        }
        return !currentStage.started && currentStage.canStart && !currentStage.completed
    }

    /**
     * Start the current stage.
     * @param props The properties for the start stage. If you not want to pass any property, you can pass an {}.
     */
    startCurrentStage(props: OnStartStageQuest): void {
        let newCurrentStage = this.currentStage
        if (newCurrentStage && this.currentStageMustStart) {
            newCurrentStage.start(props)
        }
        else {
            console.warn(`[NQTR] Quest ${this.id} can't start the current stage`)
        }
    }
}
