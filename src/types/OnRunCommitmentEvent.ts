import { OnRunProps } from "@drincs/nqtr/dist/override";

/**
 * The function that is called when the commitment is runned.
 */
export type OnRunCommitmentEvent<T> = (commitment: T, props: OnRunProps) => void
