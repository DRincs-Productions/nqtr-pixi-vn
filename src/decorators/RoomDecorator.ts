import { LocationBaseModel, RoomBaseModel } from "../classes/navigation"

export const registeredRooms: { [id: string]: RoomBaseModel } = {}

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

export function getRoomByLocation<TRoom extends RoomBaseModel = RoomBaseModel>(location: LocationBaseModel): TRoom[] {
    return Object.values(registeredRooms).filter(room => room.location === location) as TRoom[]
}
