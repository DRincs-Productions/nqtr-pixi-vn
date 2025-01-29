import { LocationInterface as OverrideLocationInterface } from "@drincs/nqtr/dist/override";
import { CommitmentInterface, LocationInterface as LocationInterfaceInt } from "..";
import NavigationAbstractInterface from "./NavigationAbstractClass";

export default interface RoomInterface extends RoomBaseInternalInterface, OverrideLocationInterface {}

export interface RoomBaseInternalInterface extends NavigationAbstractInterface {
    /**
     * The id of the room.
     */
    readonly id: string;
    /**
     * The location where the room is.
     */
    readonly location: LocationInterfaceInt;
    /**
     * Get the character commitments of the room.
     */
    readonly routine: CommitmentInterface[];
}
