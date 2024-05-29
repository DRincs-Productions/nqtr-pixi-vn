import { GraphicItemInterface } from "@drincs/nqtr/dist/override";
import { CanvasBase } from "@drincs/pixi-vn";

/**
 * Grafic item type.
 * You can override this type you must override this the GraphicItemInterface interface.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     interface GraphicItemInterface {}
 * }
 * ```
 */
type GraphicItemType = string | CanvasBase<any> | GraphicItemInterface | JSX.Element | HTMLElement
export default GraphicItemType
