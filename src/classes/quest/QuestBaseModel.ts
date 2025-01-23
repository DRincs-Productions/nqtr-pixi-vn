import { GraphicItemType, OnRenderGraphicItemProps, OnStartEndStageQuest } from "@drincs/nqtr/dist/override";
import { QuestProps, StageInterface } from "../../interface";
import QuestStoredClass from "./QuestStoredClass";
import { StageQuest } from "./StageBaseModel";

export default class QuestBaseModel extends QuestStoredClass {
    constructor(id: string, stages: StageInterface[], props: QuestProps) {
        super(id, stages)
        this._stages = stages
        this._name = props.name || ""
        this._description = props.description || ""
        this._renderIcon = props.renderIcon
        this._renderImage = props.renderImage
        this._isInDevelopment = props.isInDevelopment || false
        this._onStart = props.onStart
        this._onNextStage = props.onNextStage
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

    private _renderIcon?: GraphicItemType | ((room: QuestBaseModel, props: OnRenderGraphicItemProps) => GraphicItemType)
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

    private _renderImage?: GraphicItemType | ((room: QuestBaseModel, props: OnRenderGraphicItemProps) => GraphicItemType)
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

    private _onStart?: (stage: QuestBaseModel, props: OnStartEndStageQuest) => void
    /**
     * The function that will be called when the quest starts.
     */
    get onStart(): undefined | ((stage: QuestBaseModel, props: OnStartEndStageQuest) => void) {
        return this._onStart
    }

    private _onNextStage?: (stage: QuestBaseModel, props: OnStartEndStageQuest) => void
    /**
     * The function that will be called when the quest goes to the next stage.
     */
    get onNextStage(): undefined | ((stage: QuestBaseModel, props: OnStartEndStageQuest) => void) {
        return this._onNextStage
    }

    /**
     * Start the quest.
     * @param props The properties for the start stage. If you not want to pass any property, you can pass an {}.
     * @returns 
     */
    start(props: OnStartEndStageQuest): void {
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
            this.onStart && this.onStart(this, props)
            return currentStage.start(props)
        }
        else {
            console.error(`[NQTR] Quest ${this.id} has no start stage`)
        }
    }

    /**
     * Go to the next stage if the current stage is completed.
     * If you want to force the change of stage, use goNextStage.
     * @param props The properties. If you not want to pass any property, you can pass an {}.
     * @returns true if the stage was changed, false otherwise.
     */
    tryToGoNextStage(
        props: OnStartEndStageQuest,
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
            return this.goNextStage(props)
        }
        return false
    }

    /**
     * Complete the current stage and go to the next stage.
     * If you want to go to the next stage only if the current stage is completed, use tryToGoNextStage.
     * @param props The properties. If you not want to pass any property, you can pass an {}.
     * @returns true if the stage was changed, false otherwise.
     */
    completeCurrentStageAndGoNext(
        props: OnStartEndStageQuest,
    ): boolean {
        let currentStage = this.currentStage
        if (!currentStage) {
            console.error(`[NQTR] Quest ${this.id} has no current stage`)
            return false
        }
        currentStage.completed = true
        return this.goNextStage(props)
    }

    /**
     * Go to the next stage without checking if the current stage is completed.
     * If you want to go to the next stage only if the current stage is completed, use tryToGoNextStage.
     * @param props The properties. If you not want to pass any property, you can pass an {}.
     * @returns returns true if the stage was changed, false otherwise.
     */
    goNextStage(
        props: OnStartEndStageQuest,
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
        this.onNextStage && this.onNextStage(this, props)
        if (prevStage && prevStage.onEnd) {
            prevStage.onEnd(prevStage, props)
        }
        let nextCurrentStage = this.currentStage
        if (nextCurrentStage) {
            nextCurrentStage.inizialize()
            if (this.currentStageMustStart) {
                this.startCurrentStage(props)
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
    startCurrentStage(props: OnStartEndStageQuest): void {
        let newCurrentStage = this.currentStage
        if (newCurrentStage && this.currentStageMustStart) {
            newCurrentStage.start(props)
        }
        else {
            console.warn(`[NQTR] Quest ${this.id} can't start the current stage`)
        }
    }
}
