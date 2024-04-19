import MapBaseModel from "./Map";

export interface LocationBaseModelProps {
}

export default class LocationBaseModel<TMap extends MapBaseModel = MapBaseModel> {
    constructor(id: string, location: TMap, props: LocationBaseModelProps) { }
}
