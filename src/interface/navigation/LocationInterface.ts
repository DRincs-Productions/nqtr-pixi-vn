import { MapInterface, RoomInterface } from "..";
import NavigationAbstractInterface from "./NavigationAbstractClass";

export default interface LocationBaseInterface extends LocationBaseInternalInterface // LocationInterface 
{ }

export interface LocationBaseInternalInterface extends NavigationAbstractInterface {
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
