import P5 from "p5";
import ModCore from "../mod/base/core";
import WsHandler from "../ws";

class App {
    global: any = {};
    _p5?: P5;
    _mod?: ModCore
    title = "";
    size: [number, number] = [500, 500]; // width, height
    frameRate = 60;
    ws: WsHandler;
    constructor(title: string) {
        this.title = title;


    }
    init() {
        // p5 init
        let _p5 = (p5: P5) => {
            p5.setup = () => {
                p5?.createCanvas(this.size[0], this.size[1],"webgl");
                p5.frameRate(this.frameRate);
            }
            p5.draw = () => {
                this.render();
            }
        }
        this._p5 = new P5(_p5, document.body);

        // init mod class
        this._mod = new ModCore();
        this._mod._p5 = this._p5


        // ws
        this.ws = new WsHandler();
        this.ws.start();
        this.initEvents();
    }
    run() {
        this._mod?.initMods();
    }
    initEvents() {
        window.addEventListener('resize', this.resizeApp)
    }
    setFulLSize() {
        const _w = this._p5?.windowWidth ?? 0;
        const _h = this._p5?.windowHeight ?? 0;
        this.size = [_w, _h];
        this.resizeApp();
    }
    resizeApp() {
        this._p5?.resizeCanvas(this.size[0], this.size[1]);
    }

    render() {
        this._mod?.modDraw();
    }

    dispose() {
        this._p5?.remove();
        window.removeEventListener('resize', this.resizeApp)
    }

}
export default App;