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
}
