import { LocationInterface } from "..";
import NavigationAbstractInterface from "./NavigationAbstractClass";

export default interface MapBaseInterface extends MapBaseInternalInterface // MapInterface 
{ }

export interface MapBaseInternalInterface extends NavigationAbstractInterface {
    /**
     * The id of the map.
     */
    readonly id: string;
    /**
     * Get all locations in the map.
     * @returns The locations in the map.
     */
    readonly locations: LocationInterface[]
}
