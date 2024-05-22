import { CanvasBase } from "@drincs/pixi-vn";

/**
 * Grafic item type.
 * You can override this type to add your own types.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     type GraphicItemType = string | Object | CanvasBase<any>
 * }
 * ```
 */
type GraphicItemType = string | Object | CanvasBase<any>
export default GraphicItemType
