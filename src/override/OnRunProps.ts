/**
 * The props of the OnRunActivityEvent function.
 * You can override this interface to add your own props.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     interface OnRunProps {
 *         navigate: (route: string) => void,
 *         [key: string]: any
 *     }
 * }
 * ```
 */
export default interface OnRunProps { [key: string]: any }
