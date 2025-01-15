import { storage } from "@drincs/pixi-vn";
import { TIME_DATA_KEY, TIME_SETTINGS_KEY } from "../constants";
import TimeDataType from "../types/TimeDataType";
import { ITimeStlot, TimeSettings } from "../types/TimeSettings";

export default class TimeManager {
    private editSettings(settings: TimeSettings) {
        let data: any = {}
        if (typeof settings.minDayHours === 'number') {
            data['minDayHours'] = settings.minDayHours
        }
        if (typeof settings.maxDayHours === 'number') {
            data['maxDayHours'] = settings.maxDayHours
        }
        if (typeof settings.minDayHours === 'number') {
            data['defaultTimeSpent'] = settings.defaultTimeSpent
        }
        if (Array.isArray(settings.timeSlots)) {
            data['timeSlots'] = settings.timeSlots
        }
        if (typeof settings.weekLength === 'number') {
            data['weekLength'] = settings.weekLength
        }
        if (typeof settings.weekendStartDay === 'number') {
            let weekLength = settings.weekLength || this.weekLength
            if (settings.weekendStartDay >= weekLength) {
                console.warn(`[NQTR] Weekend start day should be less than week length ${weekLength}`)
            }
            data['weekendStartDay'] = settings.weekendStartDay
        }
        if (Array.isArray(settings.weekDaysNames)) {
            let weekLength = settings.weekLength || this.weekLength
            if (settings.weekDaysNames.length !== weekLength) {
                console.warn(`[NQTR] Week days names should be equal to week length ${weekLength}`)
            }
            data['weekDaysNames'] = settings.weekDaysNames
        }
        storage.setVariable(TIME_SETTINGS_KEY, data)
    }
    /**
     * Get time settings
     * @default {}
     */
    get settings(): TimeSettings {
        let settings = storage.getVariable<TimeSettings>(TIME_SETTINGS_KEY) || {}
        return settings
    }
    /**
     * Set time settings, Is very important to set the settings before using the nqtr library, bacause more of the features are based on the time settings.
     */
    set settings(value: TimeSettings) {
        this.editSettings(value)
    }
    get minDayHours(): number {
        let result = 0
        let settings = storage.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('minDayHours')) {
            result = settings.minDayHours || 0
        }
        return result
    }
    get maxDayHours(): number {
        let result = 24
        let settings = storage.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('maxDayHours')) {
            result = settings.maxDayHours || 24
        }
        return result
    }
    get defaultTimeSpent(): number {
        let result = 1
        let settings = storage.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('defaultTimeSpent')) {
            result = settings.defaultTimeSpent || 1
        }
        return result
    }
    get timeSlots(): ITimeStlot[] {
        let result: ITimeStlot[] = []
        let settings = storage.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('timeSlots')) {
            result = settings.timeSlots || []
        }
        return result
    }
    get weekLength(): number {
        let result = 7
        let settings = storage.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('weekLength')) {
            result = settings.weekLength || 7
        }
        return result
    }
    get weekendStartDay(): number {
        let result = this.weekLength - 1
        let settings = storage.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('weekendStartDay')) {
            result = settings.weekendStartDay || this.weekLength - 1
        }
        return result
    }
    get weekDaysNames(): string[] {
        let result: string[] = []
        let settings = storage.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('weekDaysNames')) {
            result = settings.weekDaysNames || result
        }
        return result
    }

    /**
     * Get the current hour
     */
    get currentHour(): number {
        let data = storage.getVariable<TimeDataType>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('currentHour') && typeof data.currentHour === 'number') {
            return data.currentHour
        }
        return this.minDayHours
    }
    set currentHour(value: number | undefined) {
        let data = storage.getVariable<TimeDataType>(TIME_DATA_KEY) || {}
        if (typeof value === 'number') {
            data.currentHour = value
        } else {
            delete data.currentHour
        }
        storage.setVariable(TIME_DATA_KEY, data)
    }
    /**
     * Get the current day
     */
    get currentDay(): number {
        let data = storage.getVariable<TimeDataType>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('currentDay') && typeof data.currentDay === 'number') {
            return data.currentDay
        }
        return 0
    }
    set currentDay(value: number | undefined) {
        let data = storage.getVariable<TimeDataType>(TIME_DATA_KEY) || {}
        if (typeof value === 'number') {
            data.currentDay = value
        }
        else {
            delete data.currentDay
        }
        storage.setVariable(TIME_DATA_KEY, data)
    }
    /**
     * If the current day is greater than or equal to the weekend start day, then it will return true.
     */
    get isWeekend(): boolean {
        return this.currentWeekDayNumber >= this.weekendStartDay
    }
    /**
     * Get the current week day number (1 - {@link weekLength}).
     * For example, if the week length is 7 and the current day is 10, then the result will be 4.
     */
    get currentWeekDayNumber(): number {
        let result = this.currentDay % this.weekLength
        return result + 1
    }
    /**
     * Get the current week day name. If the week days names are not defined, then it will return undefined.
     * For example, if the week days names are ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] and the current day is 10, then the result will be 'Thursday'.
     * @default ""
     */
    get currentDayName(): string {
        let weekDayNumber = this.currentWeekDayNumber - 1
        if (weekDayNumber >= this.weekDaysNames.length) {
            console.warn(`[NQTR] Week day name is not defined for day ${weekDayNumber}`, this.weekDaysNames)
            return ""
        }
        return this.weekDaysNames[weekDayNumber]
    }
    /**
     * Get the current {@link timeSlots} index.
     * You can use this property to create "Image that changes based on the time period":
     * @example
     * ```tsx
     * import { weekLength } from '@drincs/nqtr';
     * 
     * function changeBackground() {
     *     return (
     *         <img src={`background-currentTimeSlot.currentTimeSlot.png`} />
     *     )
     * }
     */
    get currentTimeSlot(): number {
        if (this.timeSlots.length === 0) {
            console.warn('[NQTR] Time slots are not defined')
            return 0
        }
        for (let index = 0; index < this.timeSlots.length; index++) {
            let slot = this.timeSlots[index]
            if (this.timeSlots.length > index + 1) {
                if (this.nowIsBetween(slot.startHour, this.timeSlots[index + 1].startHour)) {
                    return index
                }
            }
        }
        return this.timeSlots.length - 1
    }

    /**
     * This function will increase the current hour by the given time spent.
     * If the new hour is greater than or equal to the max day hours, then it will increase the day and set the new hour.
     * @param timeSpent is the time spent in hours (default: {@link defaultTimeSpent})
     * @returns currentTimeSlot.currentHour
     */
    increaseHour(timeSpent: number = this.defaultTimeSpent): number {
        let newHour = this.currentHour + timeSpent
        if (newHour >= this.maxDayHours) {
            this.increaseDay()
            newHour = this.minDayHours + (newHour - this.maxDayHours)
        }
        this.currentHour = newHour
        return this.currentHour
    }

    /**
     * This function will increase the current day by the given days.
     * @param newDayHour is the hour of the new day (default: {@link minDayHours})
     * @param days is the number of days to increase (default: 1)
     * @returns timeTracker.currentDay
     */
    increaseDay(newDayHour: number = this.minDayHours, days: number = 1): number {
        let newDay = this.currentDay + days
        this.currentDay = newDay
        this.currentHour = newDayHour
        return this.currentDay
    }

    /**
     * This function will check if the current hour is between the given hours.
     * @param fromHour the starting hour. If the {@link currentHour} is equal to this hour, the function will return true.
     * @param toHour the ending hour.
     * @returns true if the current hour is between the given hours, otherwise false.
     */
    nowIsBetween(fromHour: number, toHour: number): boolean {
        let currentHour = this.currentHour
        if (fromHour < toHour) {
            return currentHour >= fromHour && currentHour < toHour
        }
        return currentHour >= fromHour || currentHour < toHour
    }
}
