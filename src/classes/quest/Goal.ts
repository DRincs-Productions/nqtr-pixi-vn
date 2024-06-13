import { StoredClassModel } from "@drincs/pixi-vn"
import { GoalProps } from "../../interface"

const GOAL_CATEGORY = "__nqtr-goal__"

export default class Goal extends StoredClassModel {
    constructor(id: string, props: GoalProps) {
        super(GOAL_CATEGORY, id)
        this._description = props.description
        this.need = props.need || 1
        this.have = props.have || 0
    }
    private _description: string
    get description(): string {
        return this._description
    }
    need: number
    have: number
    get isComplete(): boolean {
        return this.have >= this.need
    }
    setComplete(): void {
        this.have = this.need
    }
    find(): void {
        this.have++
    }
}
