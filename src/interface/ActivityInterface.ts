import { OnRunProps, ActivityInterface as OverrideActivityInterface } from "@drincs/nqtr";

export default interface ActivityInterface extends ActivityBaseInternalInterface, OverrideActivityInterface {}

export interface ActivityBaseInternalInterface {
    /**
     * The id of the activity/commitment.
     */
    readonly id: string;
    /**
     * The hour when the activity/commitment starts. If the activity/commitment is not started yet, it will be hidden.
     */
    readonly fromHour: number | undefined;
    /**
     * The hour when the activity/commitment ends. If the activity/commitment is ended yet, it will be hidden.
     */
    readonly toHour: number | undefined;
    /**
     * The day when the activity/commitment starts. If the activity/commitment is not started yet, it will be hidden.
     */
    readonly fromDay: number | undefined;
    /**
     * The day when the activity/commitment ends. If the activity/commitment is ended yet, it will be deleted or hidden.
     */
    readonly toDay: number | undefined;
    /**
     * The function that is called when the activity/commitment is runned.
     */
    readonly run: (props: OnRunProps) => void;
    /**
     * Whether the activity/commitment is a deadline.
     */
    readonly expired: boolean;
    /**
     * Whether the activity/commitment is active.
     */
    readonly isActive: boolean;
}
