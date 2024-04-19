import { CanvasBase, StoredClassModel } from "@drincs/pixi-vn";
import MapBaseModel from "./Map";
import RoomBaseModel from "./Room";

const LOCATION_PREFIX = "__NQTR-Location__"

export interface LocationBaseModelProps<TCanvasItem extends CanvasBase<any>> {
    /**
     * The name of the location
     */
    name?: string
    /**
     * Whether the location is disabled
     */
    disabled?: boolean
    /**
     * Whether the location is hidden
     */
    hidden?: boolean
    /**
     * The icon element for the location. Can be a string or an HTMLElement or a CanvasItem
     */
    iconElement?: string | HTMLElement | TCanvasItem
}

export default class LocationBaseModel<TMap extends MapBaseModel = MapBaseModel, TCanvasItem extends CanvasBase<any> = CanvasBase<any>> extends StoredClassModel {
    constructor(id: string, location: TMap, entrance: RoomBaseModel, props: LocationBaseModelProps<TCanvasItem>) {
        super(LOCATION_PREFIX + id)
        if (entrance.location.id !== id) {
            throw new Error(`[NQTR] Entrance room ${entrance.id} is not in location ${id}`)
        }
        this._entrance = entrance
        this.defaultName = props.name || ""
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._iconElement = props.iconElement
    }
    private _entrance: RoomBaseModel
    get entrance(): RoomBaseModel {
        return this._entrance
    }

    private defaultName: string
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string) {
        this.updateStorageProperty("name", value)
    }

    private defaultDisabled: boolean
    get disabled(): boolean {
        return this.getStorageProperty<boolean>("disabled") || this.defaultDisabled
    }
    set disabled(value: boolean) {
        this.updateStorageProperty("disabled", value)
    }

    private defaultHidden: boolean
    get hidden(): boolean {
        return this.getStorageProperty<boolean>("hidden") || this.defaultHidden
    }
    set hidden(value: boolean) {
        this.updateStorageProperty("hidden", value)
    }

    private _iconElement?: string | HTMLElement | TCanvasItem
    get iconElement(): string | HTMLElement | TCanvasItem | undefined {
        return this._iconElement
    }
}
