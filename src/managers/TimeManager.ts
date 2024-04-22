import { GameStorageManager } from "@drincs/pixi-vn";

const TIME_SETTINGS_KEY = '___TimeManagerSettings___';
const TIME_DATA_KEY = '___TimeManagerData___';

export interface ITimeSettings {
    minDayHour?: number
    maxDayHour?: number
    defaultTimeSpent?: number
}

interface ITimeData {
    newDayHour?: number
    currentHour?: number
    weekLength?: number
    weekendStartDay?: number
    currentDay?: number
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
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('newDayHour') && typeof data.newDayHour === 'number') {
            return data.newDayHour
        }
        return this.minDayHour
    }
    static set newDayHour(value: number | undefined) {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (typeof value === 'number') {
            data.newDayHour = value
        } else {
            delete data.newDayHour
        }
        GameStorageManager.setVariable(TIME_DATA_KEY, data)
    }

    static get currentHour(): number {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('currentHour') && typeof data.currentHour === 'number') {
            return data.currentHour
        }
        return this.minDayHour
    }
    static set currentHour(value: number) {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        data.currentHour = value
        GameStorageManager.setVariable(TIME_DATA_KEY, data)
    }

    static get weekLength(): number {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('weekLength') && typeof data.weekLength === 'number') {
            return data.weekLength
        }
        return 7
    }
    static set weekLength(value: number) {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        data.weekLength = value
        GameStorageManager.setVariable(TIME_DATA_KEY, data)
    }

    static get weekendStartDay(): number {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('weekendStartDay') && typeof data.weekendStartDay === 'number') {
            return data.weekendStartDay
        }
        return 6
    }
    static set weekendStartDay(value: number) {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (value >= this.weekLength) {
            console.warn('[NQTR] Weekend start day should be less than week length')
        }
        data.weekendStartDay = value
        GameStorageManager.setVariable(TIME_DATA_KEY, data)
    }
    static get isWeekend(): boolean {
        return this.weekendStartDay > this.weekLength
    }
    static get currentDay(): number {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        if (data.hasOwnProperty('currentDay') && typeof data.currentDay === 'number') {
            return data.currentDay
        }
        return 0
    }
    static set currentDay(value: number) {
        let data = GameStorageManager.getVariable<ITimeData>(TIME_DATA_KEY) || {}
        data.currentDay = value
        GameStorageManager.setVariable(TIME_DATA_KEY, data)
    }
}
