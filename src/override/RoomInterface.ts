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
}
