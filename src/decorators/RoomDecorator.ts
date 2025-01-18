import { LocationInterface, MapInterface, RoomInterface } from "../interface"

export const registeredRooms: { [id: string]: RoomInterface } = {}

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
export function getRoomById(id: string): RoomInterface | undefined {
    try {
        let room = registeredRooms[id]
        if (!room) {
            console.error(`[NQTR] Room ${id} not found`)
            return
        }
        return room
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
export function getRoomsByLocation(location: LocationInterface): RoomInterface[] {
    return Object.values(registeredRooms).filter(room => room.location.id === location.id)
}

/**
 * Get all locations in the registered rooms.
 * @returns All locations in the registered rooms.
 */
export function getAllLocations(): LocationInterface[] {
    let result: { [id: string]: LocationInterface } = {}
    Object.values(registeredRooms).forEach(room => {
        result[room.location.id] = room.location
    })
    return Object.values(result)
}

/**
 * Get all locations in a map.
 * @param map The map where the locations are.
 * @returns The locations in the map.
 */
export function getLocationsByMap(map: MapInterface): LocationInterface[] {
    return getAllLocations().filter(location => location.map.id === map.id)
}

/**
 * Get all maps in the registered rooms.
 * @returns All maps in the registered rooms.
 */
export function getAllMaps(): MapInterface[] {
    let result: { [id: string]: MapInterface } = {}
    Object.values(registeredRooms).forEach(room => {
        result[room.location.map.id] = room.location.map
    })
    return Object.values(result)
}
