import { ActivityBaseModel } from "../classes"

export const registeredActivitys: { [id: string]: ActivityBaseModel } = {}

export function saveActivity<T extends ActivityBaseModel = ActivityBaseModel>(activity: T | T[]) {
    if (Array.isArray(activity)) {
        activity.forEach(c => saveActivity(c))
        return
    }
    if (registeredActivitys[activity.id]) {
        console.warn(`[NQTR] Activity id ${activity.id} already exists, it will be overwritten`)
    }
    registeredActivitys[activity.id] = activity
}

export function getActivityById<T extends ActivityBaseModel>(id: string): T | undefined {
    try {
        let Activity = registeredActivitys[id]
        if (!Activity) {
            console.error(`[NQTR] Activity ${id} not found`)
            return
        }
        return Activity as T
    }
    catch (e) {
        console.error(`[NQTR] Error while getting Activity ${id}`, e)
        return
    }
}
