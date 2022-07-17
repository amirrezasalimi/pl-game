import WsHandler from "../network/ws";
import WsEvent from "../network/ws-event";
import Camera from "../render/camera";
import Visiblity from "../render/visibility";
import Mod from "../mod/mod";
import { PL } from "./pixel-land";
import Render from "./render";
class Stage {
    constructor(canvas: Element) {
        // @ts-ignore
        // window.PL = PL;
        PL.canvas_el = canvas;
        const _ctx = (PL.canvas_el as HTMLCanvasElement).getContext('2d');
        if (_ctx)
            PL.ctx = _ctx;

    }
    init() {
        // fill pixelland shared instance
        PL.camera = new Camera();
        PL.vis = new Visiblity();
        PL.render = new Render();
        PL.mods = new Mod();
        PL.ws_handler = new WsHandler();
        PL.ws = new WsEvent();

        PL.render.drawFn = this.render.bind(this);
        PL.render.fixedUpdateFn = this.fixedUpdate.bind(this);
        // events
        this.updateSize();
        window.addEventListener("resize", this.updateSize)
        this.onMouseUpdate({
            pageX: 0,
            pageY: 0
        })
        document.addEventListener('mousemove', this.onMouseUpdate, false);
        document.addEventListener('mouseenter', this.onMouseUpdate, false);


        PL.render.start();
        PL.ws_handler.start();

        PL.mod = PL.mods.mods;
        PL.mods.mounted();

    }
    onMouseUpdate(e: any) {
        // @ts-ignore
        window.mouseX = e.pageX;
        // @ts-ignore
        window.mouseY = e.pageY;
    }
    updateSize() {
        PL.vis.size = [
            innerWidth,
            innerHeight
        ]
        const _el = PL.canvas_el as any;

        _el.width = PL.vis.size[0];
        _el.height = PL.vis.size[1];
        PL.vis.update();
    }



    fixedUpdate() {
        PL.mods.fixedUpdateMods();
    }
    render() {
        PL.ctx.save();
        PL.ctx.clearRect(0, 0, PL.vis.size[0], PL.vis.size[1]);

        PL.camera.update();

        PL.mods.updateMods();
        PL.ctx.restore();
    }
}
export default Stage;