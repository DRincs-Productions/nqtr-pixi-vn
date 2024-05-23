import { CanvasBase } from "@drincs/pixi-vn";
import GraphicHTMLElement from "./GraphicHTMLElement";
import GraphicItemInterface from "./GraphicItemInterface";

/**
 * Grafic item type.
 * You can override this type you must override this the GraphicItemInterface and the GraphicHTMLElement interfaces.
 * @example
 * ```typescript
 * // nqtr.types.ts
 * declare module '@drincs/nqtr/dist/override' {
 *     interface GraphicItemInterface {}
 *     interface GraphicHTMLElement {}
 * }
 * ```
 */
type GraphicItemType = string | CanvasBase<any> | GraphicItemInterface | GraphicHTMLElement
export default GraphicItemType
