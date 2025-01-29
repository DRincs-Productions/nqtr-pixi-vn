import { MapInterface as OverrideMapInterface } from "@drincs/nqtr/dist/override";
import { LocationInterface } from "..";
import NavigationAbstractInterface from "./NavigationAbstractClass";

export default interface MapInterface extends MapBaseInternalInterface, OverrideMapInterface {}

export interface MapBaseInternalInterface extends NavigationAbstractInterface {
    /**
     * The id of the map.
     */
    readonly id: string;
    /**
     * Get all locations in the map.
     * @returns The locations in the map.
     */
    readonly locations: LocationInterface[];
}
