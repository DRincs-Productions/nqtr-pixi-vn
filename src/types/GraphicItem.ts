import { CanvasBase } from "@drincs/pixi-vn";

export type GraphicItemType<TCanvasItem extends CanvasBase<any> = CanvasBase<any>> = string | Element | TCanvasItem