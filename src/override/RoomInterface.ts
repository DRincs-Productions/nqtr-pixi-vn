export default interface RoomInterface {
    /**
     * The name.
     * If you set undefined, it will return the initial value of name.
     */
    name: string
    /**
     * The image of the room.
     */
    readonly image: string | undefined
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
     * The icon of the room.
     */
    readonly icon: string | undefined
}
