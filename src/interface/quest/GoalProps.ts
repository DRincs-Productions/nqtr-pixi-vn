export default interface GoalProps {
    /**
     * The description of the goal.
     * @default ""
     */
    description: string
    /**
     * The value that the goal needs to be completed.
     * @default 1
     */
    need?: number
    /**
     * The value that the goal already has.
     * @default 0
     */
    have?: number
}
