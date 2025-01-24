import { ActivityInterface, CommitmentInterface, LocationInterface } from "../../interface";
import { RoomBaseInternalInterface } from "../../interface/navigation/RoomInterface";
import { routine } from "../../managers";
import NavigationAbstractClass from "./NavigationAbstractClass";

const ROOM_CATEGORY = "__nqtr-room__";
export default class RoomStoredClass extends NavigationAbstractClass implements RoomBaseInternalInterface {
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
		return routine.currentRoutine.filter((c) => c.room.id === this.id);
	}

	get location(): LocationInterface {
		return this._location;
	}
}
