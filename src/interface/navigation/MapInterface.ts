import { LocationInterface } from "..";

export default interface MapBaseInterface extends MapBaseInternalInterface // MapInterface 
{ }

export interface MapBaseInternalInterface {
    /**
     * The id of the map.
     */
    id: string;
    /**
     * Get all locations in the map.
     * @returns The locations in the map.
     */
    locations: LocationInterface[]
}
