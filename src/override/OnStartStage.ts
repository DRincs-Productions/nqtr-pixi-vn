/**
 * The props of the onStart functions.
 * You can override this interface to add your own props.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     interface OnStartStage {
 *         navigate: (route: string) => void,
 *         [key: string]: any
 *     }
 * }
 * ```
 */
export default interface OnStartStage { [key: string]: any }
