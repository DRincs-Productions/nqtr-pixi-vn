import { GameStorageManager } from "@drincs/pixi-vn";
import { ITimeStlot, TimeSettings } from "../types/TimeSettings";

const TIME_SETTINGS_KEY = '___nqtr-time_manager_settings___';
const TIME_DATA_KEY = '___nqtr-time_manager_data___';

type ITimeData = {
    currentHour?: number
    currentDay?: number
}

export default class TimeManager {
    private constructor() { }
    private static editSettings(settings: TimeSettings) {
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
            let weekLength = settings.weekLength || TimeManager.weekLength
            if (settings.weekendStartDay >= weekLength) {
                console.warn(`[NQTR] Weekend start day should be less than week length ${weekLength}`)
            }
            data['weekendStartDay'] = settings.weekendStartDay
        }
        if (Array.isArray(settings.weekDaysNames)) {
            let weekLength = settings.weekLength || TimeManager.weekLength
            if (settings.weekDaysNames.length !== weekLength) {
                console.warn(`[NQTR] Week days names should be equal to week length ${weekLength}`)
            }
            data['weekDaysNames'] = settings.weekDaysNames
        }
        GameStorageManager.setVariable(TIME_SETTINGS_KEY, data)
    }
    /**
     * Get time settings
     */
    static get settings(): TimeSettings {
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY) || {}
        return settings
    }
    /**
     * Set time settings, Is very important to set the settings before using the nqtr library, bacause more of the features are based on the time settings.
     */
    static set settings(value: TimeSettings) {
        TimeManager.editSettings(value)
    }
    static get minDayHours(): number {
        let result = 0
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('minDayHours')) {
            result = settings.minDayHours || 0
        }
        return result
    }
    static get maxDayHours(): number {
        let result = 24
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('maxDayHours')) {
            result = settings.maxDayHours || 24
        }
        return result
    }
    static get defaultTimeSpent(): number {
        let result = 1
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('defaultTimeSpent')) {
            result = settings.defaultTimeSpent || 1
        }
        return result
    }
    static get timeSlots(): ITimeStlot[] {
        let result: ITimeStlot[] = []
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('timeSlots')) {
            result = settings.timeSlots || []
        }
        return result
    }
    static get weekLength(): number {
        let result = 7
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('weekLength')) {
            result = settings.weekLength || 7
        }
        return result
    }
    static get weekendStartDay(): number {
        let result = TimeManager.weekLength - 1
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('weekendStartDay')) {
            result = settings.weekendStartDay || TimeManager.weekLength - 1
        }
        return result
    }
    static get weekDaysNames(): string[] {
        let result: string[] = []
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('weekDaysNames')) {
            result = settings.weekDaysNames || result
        }
        return result
    }

    /**
     * Get the current hour
     */
    static get currentHour(): number {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('currentHour') && typeof data.currentHour === 'number') {
            return data.currentHour
        }
        return TimeManager.minDayHours
    }
    static set currentHour(value: number | undefined) {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (typeof value === 'number') {
            data.currentHour = value
        } else {
            delete data.currentHour
        }
        GameStorageManager.setVariable(TIME_DATA_KEY, data)
    }
    /**
     * Get the current day
     */
    static get currentDay(): number {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('currentDay') && typeof data.currentDay === 'number') {
            return data.currentDay
        }
        return 0
    }
    static set currentDay(value: number | undefined) {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (typeof value === 'number') {
            data.currentDay = value
        }
        else {
            delete data.currentDay
        }
        GameStorageManager.setVariable(TIME_DATA_KEY, data)
    }
    /**
     * If the current day is greater than or equal to the weekend start day, then it will return true.
     */
    static get isWeekend(): boolean {
        return TimeManager.currentWeekDayNumber >= TimeManager.weekendStartDay
    }
    /**
     * Get the current week day number (1-TimeManager.weekLength).
     * For example, if the week length is 7 and the current day is 10, then the result will be 4.
     */
    static get currentWeekDayNumber(): number {
        let result = TimeManager.currentDay % TimeManager.weekLength
        return result + 1
    }
    /**
     * Get the current week day name. If the week days names are not defined, then it will return undefined.
     * For example, if the week days names are ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] and the current day is 10, then the result will be 'Thursday'.
     */
    static get currentDayName(): string | undefined {
        let weekDayNumber = TimeManager.currentWeekDayNumber - 1
        if (weekDayNumber >= TimeManager.weekDaysNames.length) {
            console.warn(`[NQTR] Week day name is not defined for day ${weekDayNumber}`, TimeManager.weekDaysNames)
            return undefined
        }
        return TimeManager.weekDaysNames[weekDayNumber]
    }
    /**
     * Get the current TimeManager.timeSlots index.
     * You can use this property to create "Image that changes based on the time period":
     * @example
     * ```ts
     * import { TimeManager } from '@drincs/nqtr';
     * 
     * function changeBackground() {
     *     return (
     *         <img src={`background-${TimeManager.currentTimeSlot}.png`} />
     *     )
     * }
     */
    static get currentTimeSlot(): number {
        if (TimeManager.timeSlots.length === 0) {
            console.warn('[NQTR] Time slots are not defined')
            return 0
        }
        for (let index = 0; index < TimeManager.timeSlots.length; index++) {
            let slot = TimeManager.timeSlots[index]
            if (TimeManager.timeSlots.length > index + 1) {
                if (TimeManager.nowIsBetween(slot.startHour, TimeManager.timeSlots[index + 1].startHour)) {
                    return index
                }
            }
        }
        return 0
    }

    /**
     * This function will increase the current hour by the given time spent.
     * If the new hour is greater than or equal to the max day hours, then it will increase the day and set the new hour.
     * @param timeSpent is the time spent in hours (default: TimeManager.defaultTimeSpent)
     * @returns TimeManager.currentHour
     */
    static increaseHour(timeSpent: number = TimeManager.defaultTimeSpent): number {
        let newHour = TimeManager.currentHour + timeSpent
        if (newHour >= TimeManager.maxDayHours) {
            TimeManager.increaseDay()
            newHour = TimeManager.minDayHours + (newHour - TimeManager.maxDayHours)
        }
        TimeManager.currentHour = newHour
        return TimeManager.currentHour
    }

    /**
     * This function will increase the current day by the given days.
     * @param newDayHour is the hour of the new day (default: TimeManager.minDayHours)
     * @param days is the number of days to increase (default: 1)
     * @returns TimeManager.currentDay
     */
    static increaseDay(newDayHour: number = TimeManager.minDayHours, days: number = 1): number {
        let newDay = TimeManager.currentDay + days
        TimeManager.currentDay = newDay
        TimeManager.currentHour = newDayHour
        return TimeManager.currentDay
    }

    /**
     * This function will check if the current hour is between the given hours.
     * @param fromHour the starting hour. If the TimeManager.currentHour is equal to this hour, the function will return true.
     * @param toHour the ending hour.
     * @returns true if the current hour is between the given hours, otherwise false.
     */
    static nowIsBetween(fromHour: number, toHour: number): boolean {
        let currentHour = TimeManager.currentHour
        if (fromHour < toHour) {
            return currentHour >= fromHour && currentHour < toHour
        }
        return currentHour >= fromHour || currentHour < toHour
    }
}
