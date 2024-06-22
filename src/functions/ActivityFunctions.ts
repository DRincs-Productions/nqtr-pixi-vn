import { ActivityRoom } from "../classes"
import { registeredRooms } from "../decorators/RoomDecorator"
import { getCurrentRoom } from "./NavigationFunctions"

/**
 * Clear all the expired activities.
 */
export function clearExpiredActivities() {
    Object.entries(registeredRooms).forEach(([_, room]) => {
        room.clearExpiredActivities()
    })
}

/**
 * Get the current activities. The hidden activities are not included.
 * @returns The current activities.
 */
export function currentActivities(): ActivityRoom[] {
    let currentRoom = getCurrentRoom()
    if (!currentRoom) {
        return []
    }
    return currentRoom.activities.filter(activity => !activity.hidden)
}
