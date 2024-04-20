export interface GoalProps {
    description: string
    need?: number
    have?: number
}

export interface IGoal {
    description: string
    need: number
    have: number
}

export default class Goal implements IGoal {
    constructor(props: GoalProps) {
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
    get export(): IGoal {
        return {
            description: this.description,
            need: this.need,
            have: this.have
        }
    }
}
