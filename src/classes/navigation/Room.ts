import LocationBaseModel from "./Location";

export interface RoomBaseModelProps {
}

export default class RoomBaseModel<TLocation extends LocationBaseModel = LocationBaseModel> {
    constructor(id: string, location: TLocation, props: RoomBaseModelProps) { }
}
