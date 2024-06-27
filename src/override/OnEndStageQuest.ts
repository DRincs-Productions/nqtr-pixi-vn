/**
 * The props of the onEnd functions.
 * You can override this interface to add your own props.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     interface OnEndStageQuest {
 *         navigate: (route: string) => void,
 *         [key: string]: any
 *     }
 * }
 * ```
 */
export default interface OnEndStageQuest { [key: string]: any }
