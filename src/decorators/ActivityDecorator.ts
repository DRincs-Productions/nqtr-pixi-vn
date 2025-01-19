import ActivityModel from "../classes/Activity"
import { ActivityProps } from "../interface"
import { OnRunEvent } from "../types/OnRunEvent"

export const registeredActivities: { [id: string]: ActivityModel } = {}

/**
 * Creates a new activity and registers it in the system.
 * **This function must be called at least once at system startup to register the activity, otherwise the system cannot be used.**
 * @param id The activity id, that must be unique.
 * @param onRun The function that is called when the activity is runned. Have 2 parameters: the runned activity and the yourParams object, that is an object with the parameters that you want to pass to the onRun function.
 * @param props The activity properties.
 * @returns The created activity
 */
export function newActivity(id: string, onRun: OnRunEvent<ActivityModel>, props: ActivityProps): ActivityModel {
    if (registeredActivities[id]) {
        console.warn(`[NQTR] Activity ${id} already exists, it will be overwritten`)
    }
    let activity = new ActivityModel(id, onRun, props)
    registeredActivities[id] = activity
    return activity
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
