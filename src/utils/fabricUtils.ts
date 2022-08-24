import { fabric } from "fabric";

export interface Rect {
  left: number
  top: number
  width: number
  height: number
  borderColor: string
  backgroundColor: string
  fill: string
  cornerColor: string
}
export const factoryRect = (args: Rect) => new fabric.Rect({
  type: "rect",
  cornerSize: 8,
  borderColor: "#0984e3",
  cornerStyle: "circle",
  cornerColor: "#55efc4",
  hasControls: true,
  backgroundColor: "rgba(0, 0, 0, .3)",
  left: args.left,
  top: args.top,
  width: args.width,
  height: args.height,
  fill: "rgba(255, 255, 255, 0)",
  stroke: '#0984e3',
  strokeWidth: 1,
  minScaleLimit: 0.1
})