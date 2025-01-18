export default interface LocationInterface {
    /**
     * The name of the location.
     * If you set undefined, it will return the initial value of name.
     */
    name: string
    /**
     * Whether is disabled. If it is a string, it is a Pixi'VN flag name.
     */
    disabled: boolean
    /**
     * Whether is hidden. If it is a string, it is a Pixi'VN flag name.
     */
    hidden: boolean
    /**
     * The icon of the location.
     */
    icon: string | undefined
}
