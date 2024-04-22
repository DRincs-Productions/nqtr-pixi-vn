import { GameStorageManager } from "@drincs/pixi-vn";

const TIME_SETTINGS_KEY = '___TimeManagerSettings___';
const TIME_DATA_KEY = '___TimeManagerData___';

interface ITimeSettings {
    minDayHour?: number
    maxDayHour?: number
    defaultTimeSpent?: number
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
}
