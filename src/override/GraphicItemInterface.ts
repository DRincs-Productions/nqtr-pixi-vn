
/**
 * Grafic item type.
 * You can override this interface to add your own types.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     interface GraphicItemInterface {
 *         morning: string,
 *         afternoon: string,
 *         evening: string
 *     }
 * }
 * ```
 */
export default interface GraphicItemInterface { }
