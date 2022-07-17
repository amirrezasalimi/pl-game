import Vector2 from "../base/vector";
import { PL } from "../stage/pixel-land";

class Player {
    position: Vector2 = new Vector2(500, 500);
    moveSpeed: number = 5;
    constructor() {
        PL.camera.follow(this.position);

        // mvoe player by keyboard
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch (e.key) {
                case 'w':
                    this.position.y -= this.moveSpeed;
                    break;
                case 's':
                    this.position.y += this.moveSpeed;
                    break;
                case 'a':
                    this.position.x -= this.moveSpeed;
                    break;
                case 'd':
                    this.position.x += this.moveSpeed;
                    break;
            }
        })

    }
    draw() {
        const _dd = PL.vis.getDrawDetail({
            x: this.position.x,
            y: this.position.y,
        })
        PL.ctx.beginPath();
        PL.ctx.arc(50, 50, 20 * PL.vis.rfactor, 0, 2 * Math.PI);
        PL.ctx.fillStyle = 'red';
        PL.ctx.fill();
        PL.ctx.closePath();

        // draw circle on ctx
        PL.ctx.beginPath();
        PL.ctx.arc(_dd.x, _dd.y, 10 * PL.vis.rfactor, 0, 2 * Math.PI);
        PL.ctx.fillStyle = 'green';
        PL.ctx.fill();
        PL.ctx.closePath();

    }
}
export default Player;