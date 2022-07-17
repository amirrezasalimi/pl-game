import { PL } from "../stage/pixel-land";
import { roundNum } from "../utils/utils";

class Visiblity {
    size: [number, number];
    base_size: [number, number] = [1024, 576];

    wfactor: number = 1;
    hfactor: number = 1;
    rfactor: number = 1;
    // 


    update() {
        this.wfactor = roundNum(this.size[0] / this.base_size[0]);
        this.hfactor = roundNum(this.size[1] / this.base_size[1]);
        this.rfactor = roundNum(this.wfactor / this.hfactor);
    }


    getDrawDetail(o: { x?: number, y?: number, w?: number, h?: number , r?: number }) {
        return {
            // position
            x: o?.x ? o.x * this.wfactor : this.wfactor,
            y: o?.y ? o.y * this.hfactor : this.hfactor,
            // size
            w: o?.w ? o.w * this.wfactor : this.wfactor,
            h: o?.h ? o.h * this.hfactor : this.hfactor,
            r: o?.r ? o.r * this.rfactor : this.rfactor,
        }
    }
    topLeftPosition() {
        return {
            x: PL.camera.position.x - PL.vis.size[0] / 2 / PL.camera._zoom,
            y: PL.camera.position.y - PL.vis.size[1] / 2 / PL.camera._zoom,
        }
    }

    // util
    intersectRect(r1: any, r2: any) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    }
    // check visibility for basic shapes
    isRectVisible(x: number, y: number, w: number, h: number) {
        const _x = PL.camera.position.x;
        const _y = PL.camera.position.y;
        const _w = PL.camera.position.x + this.size[0];
        const _h = PL.camera.position.y + this.size[1];
        return this.intersectRect({
            left: _x,
            right: _w,
            top: _y,
            bottom: _h
        }, {
            left: x,
            right: x + w,
            top: y,
            bottom: y + h
        })
    }
}
export default Visiblity;