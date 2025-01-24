import { LocationInterface } from "@drincs/nqtr/dist/override";
import { MapInterface, RoomInterface } from "..";
import NavigationAbstractInterface from "./NavigationAbstractClass";

export default interface LocationBaseInterface extends LocationInternalInterface, LocationInterface {}

export interface LocationInternalInterface extends NavigationAbstractInterface {
	/**
	 * The id of the location.
	 */
	readonly id: string;
	/**
	 * The map where the location is.
	 */
	readonly map: MapInterface;
	/**
	 * Get all rooms in the location.
	 * @returns The rooms in the location.
	 */
	readonly rooms: RoomInterface[];
}
