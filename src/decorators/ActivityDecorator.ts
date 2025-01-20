import { ActivityInterface } from "../interface"

export const registeredActivities: { [id: string]: ActivityInterface } = {}

export function saveActivity(activities: ActivityInterface | ActivityInterface[]) {
    if (Array.isArray(activities)) {
        activities.forEach(activity => {
            registeredActivities[activity.id] = activity
        })
        return
    }
    registeredActivities[activities.id] = activities
}

/**
 * Get an activity by its id.
 * @param id The id of the activity.
 * @returns The activity or undefined if not found.
 */
export function getActivityById(id: string): ActivityInterface | undefined {
    try {
        let activity = registeredActivities[id]
        if (!activity) {
            console.error(`[NQTR] Activity ${id} not found`)
            return
        }
        return activity
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Activity ${id}`, e)
        return
    }
}
