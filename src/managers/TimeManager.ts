import { GameStorageManager } from "@drincs/pixi-vn";

const TIME_SETTINGS_KEY = '___TimeManagerSettings___';
const TIME_DATA_KEY = '___TimeManagerData___';

export interface ITimeSettings {
    minDayHour?: number
    maxDayHour?: number
    defaultTimeSpent?: number
    timeSlots?: ITimeStlot[]
    weekLength?: number
    newDayHour?: number
    weekendStartDay?: number
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
    static set editSettings(value: ITimeSettings) {
        let settings: any = {}
        if (typeof value.minDayHour === 'number') {
            settings['minDayHour'] = value.minDayHour
        }
        if (typeof value.maxDayHour === 'number') {
            settings['maxDayHour'] = value.maxDayHour
        }
        if (typeof value.minDayHour === 'number') {
            settings['defaultTimeSpent'] = value.defaultTimeSpent
        }
        if (Array.isArray(value.timeSlots)) {
            settings['timeSlots'] = value.timeSlots
        }
        if (typeof value.weekLength === 'number') {
            settings['weekLength'] = value.weekLength
        }
        if (typeof value.newDayHour === 'number') {
            settings['newDayHour'] = value.newDayHour
        }
        if (typeof value.weekendStartDay === 'number') {
            let weekLength = value.weekLength || TimeManager.weekLength
            if (value.weekendStartDay >= weekLength) {
                console.warn(`[NQTR] Weekend start day should be less than week length ${weekLength}`)
            }
            settings['weekendStartDay'] = value.weekendStartDay
        }
        if (Array.isArray(value.weekDaysNames)) {
            let weekLength = value.weekLength || TimeManager.weekLength
            if (value.weekDaysNames.length !== weekLength) {
                console.warn(`[NQTR] Week days names should be equal to week length ${weekLength}`)
            }
            settings['weekDaysNames'] = value.weekDaysNames
        }
        GameStorageManager.setVariable(TIME_SETTINGS_KEY, settings)
    }
    static get minDayHour(): number {
        let result = 0
        let settings = GameStorageManager.getVariable<ITimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('minDayHour')) {
            result = settings.minDayHour || 0
        }
        return result
    }
    static get maxDayHour(): number {
        let result = 24
        let settings = GameStorageManager.getVariable<ITimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('maxDayHour')) {
            result = settings.maxDayHour || 24
        }
        return result
    }
    static get defaultTimeSpent(): number {
        let result = 1
        let settings = GameStorageManager.getVariable<ITimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('defaultTimeSpent')) {
            result = settings.defaultTimeSpent || 1
        }
        return result
    }
    static get newDayHour(): number {
        let result = 0
        let settings = GameStorageManager.getVariable<ITimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('newDayHour')) {
            result = settings.newDayHour || 0
        }
        return result
    }
    static get timeSlots(): ITimeStlot[] {
        let result: ITimeStlot[] = []
        let settings = GameStorageManager.getVariable<ITimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('timeSlots')) {
            result = settings.timeSlots || []
        }
        return result
    }
    static get weekLength(): number {
        let result = 7
        let settings = GameStorageManager.getVariable<ITimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('weekLength')) {
            result = settings.weekLength || 7
        }
        return result
    }
    static get weekendStartDay(): number {
        let result = TimeManager.weekLength - 1
        let settings = GameStorageManager.getVariable<ITimeSettings>(TIME_SETTINGS_KEY)
        if (settings && settings.hasOwnProperty('weekendStartDay')) {
            result = settings.weekendStartDay || TimeManager.weekLength - 1
        }
        return result
    }
    static get weekDaysNames(): string[] {
        let result: string[] = []
        let settings = GameStorageManager.getVariable<ITimeSettings>(TIME_SETTINGS_KEY)
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
        return TimeManager.weekendStartDay > TimeManager.weekLength
    }
    static get weekDay(): number {
        let result = TimeManager.currentDay % TimeManager.weekLength
        return result
    }
    static get weekDayName(): string | undefined {
        if (TimeManager.weekDay >= TimeManager.weekDaysNames.length) {
            console.warn(`[NQTR] Week day name is not defined for day ${TimeManager.weekDay}`, TimeManager.weekDaysNames)
            return undefined
        }
        return TimeManager.weekDaysNames[TimeManager.weekDay]
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

    static nowIsBetween(startHour: number, endHour: number): boolean {
        let currentHour = TimeManager.currentHour
        if (startHour < endHour) {
            return currentHour >= startHour && currentHour < endHour
        }
        return currentHour >= startHour || currentHour < endHour
    }
}
