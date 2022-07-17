import Stage from './modules/pixel-land/core/stage/stage';
import { authInit } from './modules/auth/auth';
import './shared/styles/main.scss'

window.onload = () => {
    authInit();
    const _canvas = document.querySelector('#stage0');
    if (_canvas) {
        const game = new Stage(_canvas);
        game.init();
        // PL.mods.addMod('player', game);
    }
}