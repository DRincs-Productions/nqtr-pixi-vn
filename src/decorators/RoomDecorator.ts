import { RoomInterface } from "../interface";

export const registeredRooms: { [id: string]: RoomInterface } = {};

/**
 * Save a room in the registered rooms. If the room already exists, it will be overwritten.
 * @param room The room to save.
 * @returns
 * @example
 * ```ts
 * saveRoom([mcRoom, aliceRoom, annRoom, bathroom, lounge, terrace, gymRoom]);
 * ```
 */
export function saveRoom(room: RoomInterface | RoomInterface[]) {
	if (Array.isArray(room)) {
		room.forEach((c) => saveRoom(c));
		return;
	}
	if (registeredRooms[room.id]) {
		console.warn(`[NQTR] Room id ${room.id} already exists, it will be overwritten`);
	}
	registeredRooms[room.id] = room;
}

/**
 * Get a room by its id.
 * @param id The id of the room.
 * @returns The room or undefined if not found.
 */
export function getRoomById(id: string): RoomInterface | undefined {
	try {
		let room = registeredRooms[id];
		if (!room) {
			console.error(`[NQTR] Room ${id} not found`);
			return;
		}
		return room;
	} catch (e) {
		console.error(`[NQTR] Error while getting Room ${id}`, e);
		return;
	}
}
