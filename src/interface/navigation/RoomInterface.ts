import { LocationInterface } from "..";
import NavigationAbstractInterface from "./NavigationAbstractClass";

export default interface RoomBaseInterface extends RoomBaseInternalInterface // LocationInterface 
{ }

export interface RoomBaseInternalInterface extends NavigationAbstractInterface {
    /**
     * The id of the room.
     */
    id: string;
    /**
     * The location where the room is.
     */
    location: LocationInterface
}
