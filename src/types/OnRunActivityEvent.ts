import { OnRunProps } from "@drincs/nqtr/dist/override";
import { ActivityInterface } from "../interface";

/**
 * The function that is called when the activity is runned.
 */
export type OnRunActivityEvent = (activity: ActivityInterface, props: OnRunProps) => void
