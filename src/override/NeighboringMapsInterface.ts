
/**
 * This interface is used to define the neighboring maps of a map.
 * You can override this interface to add your own types.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     interface NeighboringMapsInterface {
 *         "north": string,
 *         "south": string,
 *         "east": string,
 *         "west": string,
 *     }
 * }
 * ```
 */
export default interface NeighboringMapsInterface { [key: string]: any }
