export default interface LocationInterface {
    /**
     * The name of the location.
     * If you set undefined, it will return the initial value of name.
     */
    name: string
    /**
     * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
     */
    get disabled(): boolean
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set disabled(value: boolean | string)
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    get hidden(): boolean
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    set hidden(value: boolean | string)
    /**
     * The icon of the location.
     */
    readonly icon: string | undefined
}
