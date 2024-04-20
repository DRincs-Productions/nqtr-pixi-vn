import { CanvasBase } from "@drincs/pixi-vn";

export type GraphicItem<TCanvasItem extends CanvasBase<any> = CanvasBase<any>> = string | HTMLElement | TCanvasItem