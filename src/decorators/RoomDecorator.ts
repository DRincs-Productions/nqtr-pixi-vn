import { LocationBaseModel, RoomBaseModel } from "../classes/navigation"

export const registeredRooms: { [id: string]: RoomBaseModel } = {}

/**
 * Save a room in the registered rooms.
 * @param room The room to save.
 * @returns 
 */
export function saveRoom<TRoom extends RoomBaseModel = RoomBaseModel>(room: TRoom | TRoom[]) {
    if (Array.isArray(room)) {
        room.forEach(c => saveRoom(c))
        return
    }
    if (registeredRooms[room.id]) {
        console.warn(`[NQTR] Room id ${room.id} already exists, it will be overwritten`)
    }
    registeredRooms[room.id] = room
}

/**
 * Get a room by its id.
 * @param id The id of the room.
 * @returns The room or undefined if not found.
 */
export function getRoomById<TRoom extends RoomBaseModel = RoomBaseModel>(id: string): TRoom | undefined {
    try {
        let room = registeredRooms[id]
        if (!room) {
            console.error(`[NQTR] Room ${id} not found`)
            return
        }
        return room as TRoom
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Room ${id}`, e)
        return
    }
}

/**
 * Get all rooms in a location.
 * @param location The location where the rooms are.
 * @returns The rooms in the location.
 */
export function getRoomsByLocation<TRoom extends RoomBaseModel = RoomBaseModel>(location: LocationBaseModel): TRoom[] {
    return Object.values(registeredRooms).filter(room => room.location === location) as TRoom[]
}
