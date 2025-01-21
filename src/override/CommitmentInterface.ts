export default interface CommitmentInterface {
    /**
     * The name of the commitment.
     */
    readonly name: string
    /**
     * The image of the commitment.
     */
    readonly image: string
    /**
     * The icon of the commitment.
     */
    readonly icon: string
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     */
    disabled: boolean
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     */
    hidden: boolean
}
