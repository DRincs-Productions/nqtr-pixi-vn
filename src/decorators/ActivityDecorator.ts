import { ActivitySynchronizedModel } from "../classes"

export const registeredActivitys: { [id: string]: ActivitySynchronizedModel } = {}

export function saveActivity<T extends ActivitySynchronizedModel = ActivitySynchronizedModel>(activity: T | T[]) {
    if (Array.isArray(activity)) {
        activity.forEach(c => saveActivity(c))
        return
    }
    if (registeredActivitys[activity.id]) {
        console.warn(`[NQTR] Activity id ${activity.id} already exists, it will be overwritten`)
    }
    registeredActivitys[activity.id] = activity
}

export function getActivityById<T extends ActivitySynchronizedModel>(id: string): T | undefined {
    try {
        let activity = registeredActivitys[id]
        if (!activity) {
            console.error(`[NQTR] Activity ${id} not found`)
            return
        }
        return activity as T
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Activity ${id}`, e)
        return
    }
}
