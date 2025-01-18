export default interface RoomBaseModelProps {
    /**
     * The name
     * @default ""
     */
    name?: string
    /**
     * The image. It can be a string, an Element or a Pixi'VN Canvas Item.
     * Or an object to manage multiple image types. For example to have a image based on time.
     * @example
     * ```ts
     * {
     *    "morning": "morning-background.jpg",
     *    "afternoon": "afternoon-background.jpg",
     *    "evening": "evening-background.jpg",
     *    "night": "night-background.jpg"
     * }
     * ```
     * @default undefined
     */
    renderImage?: GraphicItemType | ((room: RoomBaseModel<TLocation>, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * The activities that are available in this room.
     * @default []
     */
    defaultActivities?: ActivityModel[],
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
     * The icon element. Can be a string or an Element or a Pixi'VN CanvasItem
     * @default undefined
     */
    renderIcon?: GraphicItemType | ((room: RoomBaseModel<TLocation>, props: OnRenderGraphicItemProps) => GraphicItemType)
    /**
     * Whether is an entrance room, so when the player enters in the location, it will be the first room to be shown.
     * @default false
     */
    isEntrance?: boolean
}
