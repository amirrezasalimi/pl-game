import Camera from "../render/camera";
import Stage from "./stage";
import Visiblity from "../render/visibility";
import Render from "./render";
import Mods from "./mod";
import WsEvent from "../network/ws-event";
import WsHandler from "../network/ws";
class PixelLandShared {
    camera: Camera
    stage: Stage;
    vis: Visiblity;
    mods: Mods;
    ws: WsEvent;
    ws_handler: WsHandler;

    render: Render
    ctx: CanvasRenderingContext2D;
    canvas_el: Element;
}
export const PixelLand = new PixelLandShared();
export const PL = new PixelLandShared();