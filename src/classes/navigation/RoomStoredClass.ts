import { getCurrentRoutine } from "../../functions";
import { ActivityInterface, CommitmentInterface, LocationInterface, RoomInterface } from "../../interface";
import NavigationAbstractClass from "./NavigationAbstractClass";

const ROOM_CATEGORY = "__nqtr-room__";
export default class RoomStoredClass extends NavigationAbstractClass implements RoomInterface {
	constructor(
		id: string,
		/**
		 * The location where the room is.
		 */
		private readonly _location: LocationInterface,
		activities: ActivityInterface[] = []
	) {
		super(ROOM_CATEGORY, id, activities);
	}
	get routine(): CommitmentInterface[] {
		return getCurrentRoutine().filter((c) => c.room.id === this.id);
	}

	get location(): LocationInterface {
		return this._location;
	}
}
