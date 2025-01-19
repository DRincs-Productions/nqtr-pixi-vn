import { OnRunProps } from "@drincs/nqtr/dist/override";

/**
 * The function that is called when the class is runned.
 */
export type OnRunEvent<T> = (item: T, props: OnRunProps) => void
