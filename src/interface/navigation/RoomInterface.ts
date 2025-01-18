import { LocationInterface } from "..";

export default interface RoomBaseInterface extends RoomBaseInternalInterface // LocationInterface 
{ }

export interface RoomBaseInternalInterface {
    /**
     * The id of the room.
     */
    id: string;
    /**
     * The location where the room is.
     */
    location: LocationInterface
}
