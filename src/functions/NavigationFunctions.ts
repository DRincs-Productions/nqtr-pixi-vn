import { GameStorageManager } from "@drincs/pixi-vn";
import { LocationBaseModel, MapBaseModel, RoomBaseModel } from "../classes";
import { getRoomById } from "../decorators/RoomDecorator";

const CURRENT_ROOM_MEMORY_KEY = '___nqtr-current_room_memory___';

/**
 * Set the current room.
 * @param room The room to set as current room.
 * @returns
 */
export function setCurrentRoom<TRoom extends RoomBaseModel = RoomBaseModel>(room: TRoom | LocationBaseModel) {
    if (room instanceof LocationBaseModel) {
        let entrance = room.getEntrance<TRoom>();
        if (!entrance) {
            console.error(`[NQTR] The location ${room.id} has no entrance room`);
            return;
        }
        room = entrance;
    }
    else {
        let roomRegistrated = getRoomById(room.id);
        if (!roomRegistrated) {
            console.error(`[NQTR] The room ${room.id} is not registered, so it can't be set as current room`);
            return;
        }
    }
    GameStorageManager.setVariable(CURRENT_ROOM_MEMORY_KEY, room.id);
}

/**
 * Get the current room.
 * @returns The current room or undefined if not set.
 */
export function getCurrentRoom<TRoom extends RoomBaseModel = RoomBaseModel>(): TRoom | undefined {
    let roomId = GameStorageManager.getVariable<string>(CURRENT_ROOM_MEMORY_KEY);
    if (!roomId) {
        console.error(`[NQTR] The current room has not yet been set`);
        return
    }
    let room = getRoomById<TRoom>(roomId);
    if (!room) {
        console.error(`[NQTR] Current room ${roomId} not found`);
        return
    }
    return room
}

/**
 * Get the current location.
 * @returns The current location or undefined if not set.
 */
export function getCurrenrLocation<TLocation extends LocationBaseModel = LocationBaseModel>(): TLocation | undefined {
    let room = getCurrentRoom<RoomBaseModel<TLocation>>();
    if (!room) {
        return
    }
    return room.location
}

/**
 * Get the current map.
 * @returns The current map or undefined if not set.
 */
export function getCurrentMap<TMap extends MapBaseModel = MapBaseModel>(): TMap | undefined {
    let location = getCurrenrLocation<LocationBaseModel<TMap>>();
    if (!location) {
        return
    }
    return location.map
}
