import { OnRunProps } from "@drincs/nqtr/dist/override";

/**
 * The function that is called when the activity is runned.
 */
export type OnRunActivityEvent<T> = (activity: T, props: OnRunProps) => void
