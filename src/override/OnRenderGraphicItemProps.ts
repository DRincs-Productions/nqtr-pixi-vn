/**
 * The props of the function for rendering a graphic item.
 * You can override this interface to add your own props.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     interface OnRenderGraphicItemProps {
 *         navigate: (route: string) => void,
 *         [key: string]: any
 *     }
 * }
 * ```
 */
export default interface OnRenderGraphicItemProps { [key: string]: any }
