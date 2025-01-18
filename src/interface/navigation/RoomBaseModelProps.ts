import { ActivityInterface } from ".."

export default interface RoomBaseModelProps {
    /**
     * The name
     * @default ""
     */
    name?: string
    /**
     * The image of the room.
     * @default undefined
     */
    image?: string
    /**
     * The activities that are available in this room.
     * @default []
     */
    activities?: ActivityInterface[],
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     * @default false
     */
    disabled?: boolean | string
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     * @default false
     */
    hidden?: boolean | string
    /**
     * The icon of the room.
     * @default undefined
     */
    icon?: string
}
