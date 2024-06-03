import { ActivityRoom } from "../classes"
import { registeredRooms } from "../decorators/RoomDecorator"
import { getCurrentRoom } from "./NavigationFunctions"

export function clearExpiredActivities() {
    Object.entries(registeredRooms).forEach(([_, room]) => {
        room.clearExpiredActivities()
    })
}

export function currentActivities(): ActivityRoom[] {
    let currentRoom = getCurrentRoom()
    if (!currentRoom) {
        return []
    }
    return currentRoom.activities.filter(activity => !activity.hidden)
}
