import { MapInterface, RoomInterface } from "..";

export default interface LocationBaseInterface extends LocationBaseInternalInterface // LocationInterface 
{ }

export interface LocationBaseInternalInterface {
    /**
     * The id of the location.
     */
    id: string;
    /**
     * The map where the location is.
     */
    map: MapInterface
    /**
     * Get all rooms in the location.
     * @returns The rooms in the location.
     */
    rooms: RoomInterface[]
}
