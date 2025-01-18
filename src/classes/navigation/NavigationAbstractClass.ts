import { StoredClassModel } from "@drincs/pixi-vn";
import { ActivityInterface } from "../../interface";

export default abstract class NavigationAbstractClass extends StoredClassModel {
    private defaultActivities: ActivityInterface[] = []
    private get defaultActivitiesIds(): string[] {
        return this.defaultActivities.map(activity => activity.id)
    }
    private get additionalActivitiesIds(): string[] {
        return this.getStorageProperty<string[]>(`additionalActivitiesIds`) || []
    }
    private get excludedActivitiesIds(): string[] {
        return this.getStorageProperty<string[]>(`excludedActivitiesIds`) || []
    }
    addActivity(activity: ActivityInterface) {
        if (this.defaultActivitiesIds.includes(activity.id)) {
            console.warn(`[NQTR] Activity with id ${activity.id} already exists, so it will be ignored.`)
            return
        }
        let additionalActivitiesIds = this.additionalActivitiesIds
        if (additionalActivitiesIds.includes(activity.id)) {
            console.warn(`[NQTR] Activity with id ${activity.id} already exists, so it will be ignored.`)
            return
        }
        additionalActivitiesIds.push(activity.id)
        this.setStorageProperty(`additionalActivitiesIds`, additionalActivitiesIds)
    }
    revoveActivity(activity: ActivityInterface) {
        let additionalActivitiesIds = this.additionalActivitiesIds
        if (additionalActivitiesIds.includes(activity.id)) {
            additionalActivitiesIds = additionalActivitiesIds.filter(id => id !== activity.id)
            this.setStorageProperty(`additionalActivitiesIds`, additionalActivitiesIds)
        }
        else if (this.defaultActivitiesIds.includes(activity.id)) {
            let excludedActivitiesIds = this.excludedActivitiesIds
            excludedActivitiesIds.push(activity.id)
            this.setStorageProperty(`excludedActivitiesIds`, excludedActivitiesIds)
        }
        else {
            console.warn(`[NQTR] Activity with id ${activity.id} not found, so it will be ignored.`)
        }
    }
}
