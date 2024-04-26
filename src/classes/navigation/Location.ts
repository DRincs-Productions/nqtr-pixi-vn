import { getFlag, StoredClassModel } from "@drincs/pixi-vn";
import { GraphicItemType } from "../../types/GraphicItem";
import MapBaseModel from "./Map";
import RoomBaseModel from "./Room";

const LOCATION_CATEGORY = "__nqtr-location__"

export interface LocationBaseModelProps {
    /**
     * The name
     */
    name?: string
    /**
     * Whether is disabled. You can also pass a Pixi'VN flag name.
     */
    disabled?: boolean | string
    /**
     * Whether is hidden. You can also pass a Pixi'VN flag name.
     */
    hidden?: boolean | string
    /**
     * The icon element. Can be a string or an HTMLElement or a Pixi'VN CanvasItem
     */
    iconElement?: GraphicItemType
}

export default class LocationBaseModel<TMap extends MapBaseModel = MapBaseModel> extends StoredClassModel {
    constructor(id: string, map: TMap, entrance: RoomBaseModel, props: LocationBaseModelProps) {
        super(LOCATION_CATEGORY, id)
        if (entrance.location.id !== id) {
            throw new Error(`[NQTR] Entrance room ${entrance.id} is not in location ${id}`)
        }
        this._entrance = entrance
        this.defaultName = props.name || ""
        this.defaultDisabled = props.disabled || false
        this.defaultHidden = props.hidden || false
        this._iconElement = props.iconElement
        this._map = map
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
        this.setStorageProperty("name", value)
    }

    private defaultDisabled: boolean | string
    get disabled(): boolean {
        let value = this.getStorageProperty<boolean>("disabled") || this.defaultDisabled
        if (typeof value === "string") {
            return getFlag(value)
        }
        return value
    }
    set disabled(value: boolean | string) {
        this.setStorageProperty("disabled", value)
    }

    private defaultHidden: boolean | string
    get hidden(): boolean {
        let value = this.getStorageProperty<boolean>("hidden") || this.defaultHidden
        if (typeof value === "string") {
            return getFlag(value)
        }
        return value
    }
    set hidden(value: boolean | string) {
        this.setStorageProperty("hidden", value)
    }

    private _iconElement?: GraphicItemType
    get iconElement(): GraphicItemType | undefined {
        return this._iconElement
    }

    private _map: TMap
    get map(): TMap {
        return this._map
    }
}
