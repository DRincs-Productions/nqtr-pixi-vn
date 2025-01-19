import { OnRunProps } from "@drincs/nqtr/dist/override";

export default interface ActivityBaseInterface extends ActivityBaseInternalInterface // ActivityInterface 
{ }

export interface ActivityBaseInternalInterface {
    /**
     * The id of the activity.
     */
    readonly id: string;
    /**
     * The hour when the activity starts. If the activity is not started yet, it will be hidden.
     */
    readonly fromHour: number | undefined
    /**
     * The hour when the activity ends. If the activity is ended yet, it will be hidden.
     */
    readonly toHour: number | undefined
    /**
     * The day when the activity starts. If the activity is not started yet, it will be hidden.
     */
    readonly fromDay: number | undefined
    /**
     * The day when the activity ends. If the activity is ended yet, it will be deleted or hidden.
     */
    readonly toDay: number | undefined
    /**
     * The function that is called when the activity is runned.
     */
    readonly run: (props: OnRunProps) => void
    /**
     * Whether the activity is a deadline.
     * @returns Whether the activity is a deadline.
     */
    readonly isDeadline: boolean
}
