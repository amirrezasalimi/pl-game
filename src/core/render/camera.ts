import Vector2 from "../base/vector";
import { PL } from "../stage/pixel-land";

class Camera {
    follow_position: Vector2 | null = null;
    position: Vector2 = new Vector2(0, 0);
    _zoom: number = 1.0;

    zoom(zoom: number) {
        this._zoom = zoom;
        this._move();
    }
    to(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
        this._move();
    }
    follow(position: Vector2) {
        this.follow_position = position;
    }
    unfollow() {
        this.follow_position = null;
    }
    // will run in the render loop
    update() {
        if (this.follow_position) {
            this.position.x = this.follow_position.x;
            this.position.y = this.follow_position.y;
            this._move();
        }
    }
    _move() {
        this.position.x = PL.vis.wfactor * this.position.x;
        this.position.y = PL.vis.hfactor * this.position.y;

        // move camera to position and center on follow_position
        const width = PL.vis.size[0]; 
        const height = PL.vis.size[1];
        PL.ctx.scale(this._zoom, this._zoom);
        PL.ctx.translate(
            -this.position.x + width / 2 / this._zoom,
            -this.position.y + height / 2 / this._zoom
        );
    }
}
export default Camera;