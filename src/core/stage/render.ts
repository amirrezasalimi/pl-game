class Render {
    drawFn: any;
    fixedUpdateFn: any;
    playing: boolean = false;

    fps: number = 30;
    fpsInterval: number = 1000 / this.fps;
    then: any;
    startTime: any;
    _inerval: any;
    toggleRender(play: boolean) {
        if (play != this.playing) {
            this.playing = play;
            if (play) {
                this.then = Date.now();
                this.startTime = this.then;
                this.renderLoop();
                this.fixedLoop();
            } else {
                clearInterval(this._inerval);
            }
        }
    }

    start() {
        this.toggleRender(true);
    }
    stop() {
        this.toggleRender(false);
    }

    renderLoop() {

        if (this.playing) {
            requestAnimationFrame(this.renderLoop.bind(this));
        }
        // calc elapsed time since last loop

        const now = Date.now();
        const elapsed = now - this.then;
        // if enough time has elapsed, draw the next frame

        if (elapsed > this.fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = now - (elapsed % this.fpsInterval);

            this.drawFn()

        }
    }

    fixedLoop() {
        this._inerval = setInterval(() => {
            if (this.playing)
                this.fixedUpdateFn();
        }, this.fpsInterval);
    }
}
export default Render;