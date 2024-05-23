
/**
 * Grafic item type.
 * You can override this interface to add your JS Framework Element (For example: React, Vue, Angular, etc).
 * @example
 * ```typescript
 * // nqtr.types.ts
 * // react
 * declare module '@drincs/nqtr/dist/override' {
 *     interface GraphicHTMLElement extends React.ReactNode {} 
 * }
 * ```
 */
export default interface GraphicHTMLElement extends HTMLElement, JSX.Element { }
