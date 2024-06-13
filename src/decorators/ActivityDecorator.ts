import { ActivityModel } from "../classes"

export const registeredActivities: { [id: string]: ActivityModel } = {}

/**
 * Save an activity in the registered activities. If the activity already exists, it will be overwritten.
 * @param activity The activity to save.
 * @returns 
 * @example
 * ```ts
 * saveActivity([nap, sleep, eat, study, work, exercise]);
 * ```
 */
export function saveActivity(activity: ActivityModel | ActivityModel[]) {
    if (Array.isArray(activity)) {
        activity.forEach(c => saveActivity(c))
        return
    }
    if (registeredActivities[activity.id]) {
        console.warn(`[NQTR] Activity id ${activity.id} already exists, it will be overwritten`)
    }
    registeredActivities[activity.id] = activity
}

/**
 * Get an activity by its id.
 * @param id The id of the activity.
 * @returns The activity or undefined if not found.
 */
export function getActivityById(id: string): ActivityModel | undefined {
    try {
        let activity = registeredActivities[id]
        if (!activity) {
            console.error(`[NQTR] Activity ${id} not found`)
            return
        }
        return activity as ActivityModel
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Activity ${id}`, e)
        return
    }
}
