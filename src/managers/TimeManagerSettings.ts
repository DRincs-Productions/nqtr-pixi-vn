import { ITimeStlot, TimeSettings } from "../types/TimeSettings";

export default class TimeManagerSettings implements TimeSettings {
    static minDayHours: number = 0
    static maxDayHours: number = 24
    static defaultTimeSpent: number = 1
    static timeSlots: ITimeStlot[] = []
    static weekLength: number = 7
    static weekendStartDay: number = this.weekLength - 1
    static weekDaysNames: string[] = []
}
