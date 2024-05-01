import { GameStorageManager } from "@drincs/pixi-vn";

const TIME_SETTINGS_KEY = '___nqtr-time_manager_settings___';
const TIME_DATA_KEY = '___nqtr-time_manager_data___';

export interface TimeSettings {
    /**
     * Minimum hour of the day (default: 0)
     */
    minDayHour?: number
    /**
     * Maximum hour of the day (default: 24)
     */
    maxDayHour?: number
    /**
     * Default time spent (default: 1)
     */
    defaultTimeSpent?: number
    /**
     * Time slots (default: [])
     * @example
     * ```ts
     * [
     *   { name: 'Morning', startHour: 5 },
     *   { name: 'Afternoon', startHour: 12 },
     *   { name: 'Evening', startHour: 18 },
     *   { name: 'Night', startHour: 22 }
     * ]
     */
    timeSlots?: ITimeStlot[]
    /**
     * Week length (default: 7)
     */
    weekLength?: number
    /**
     * Weekend start day. For example, if the real life weekend starts on Saturday, then the value should be 6 (default: weekLength - 1)
     */
    weekendStartDay?: number
    /**
     * Week days names (default: [])
     * @example
     * ```ts
     * ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
     * ```
     */
    weekDaysNames?: string[]
}

interface ITimeData {
    currentHour?: number
    currentDay?: number
}

export interface ITimeStlot {
    name: string
    startHour: number
}

export default class TimeManager {
    private constructor() { }
    static set editSettings(settings: TimeSettings) {
        let data: any = {}
        if (typeof settings.minDayHour === 'number') {
            data['minDayHour'] = settings.minDayHour
        }
        if (typeof settings.maxDayHour === 'number') {
            data['maxDayHour'] = settings.maxDayHour
        }
        if (typeof settings.minDayHour === 'number') {
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
    static get minDayHour(): number {
        let result = 0
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('minDayHour')) {
            result = settings.minDayHour || 0
        }
        return result
    }
    static get maxDayHour(): number {
        let result = 24
        let settings = GameStorageManager.getVariable<TimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('maxDayHour')) {
            result = settings.maxDayHour || 24
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

    static get currentHour(): number {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('currentHour') && typeof data.currentHour === 'number') {
            return data.currentHour
        }
        return TimeManager.minDayHour
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


    static get isWeekend(): boolean {
        return TimeManager.weekDayNumber >= TimeManager.weekendStartDay
    }
    static get weekDayNumber(): number {
        let result = TimeManager.currentDay % TimeManager.weekLength
        return result + 1
    }
    static get weekDayName(): string | undefined {
        let weekDayNumber = TimeManager.weekDayNumber - 1
        if (weekDayNumber >= TimeManager.weekDaysNames.length) {
            console.warn(`[NQTR] Week day name is not defined for day ${weekDayNumber}`, TimeManager.weekDaysNames)
            return undefined
        }
        return TimeManager.weekDaysNames[weekDayNumber]
    }


    static newHour(timeSpent: number = TimeManager.defaultTimeSpent): number {
        let newHour = TimeManager.currentHour + timeSpent
        if (newHour >= TimeManager.maxDayHour) {
            TimeManager.newDay()
            newHour = TimeManager.minDayHour + (newHour - TimeManager.maxDayHour)
        }
        TimeManager.currentHour = newHour
        return newHour
    }

    static newDay(days: number = 1): number {
        let newDay = TimeManager.currentDay + days
        TimeManager.currentDay = newDay
        return newDay
    }

    static nowIsBetween(fromHour: number, toHour: number): boolean {
        let currentHour = TimeManager.currentHour
        if (fromHour < toHour) {
            return currentHour >= fromHour && currentHour < toHour
        }
        return currentHour >= fromHour || currentHour < toHour
    }
}
