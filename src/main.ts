import { PL } from './core/stage/pixel-land';
import Stage from './core/stage/stage';
import './style.css'

window.onload = () => {

    const _canvas = document.querySelector('#stage0');
    if (_canvas) {
        const game = new Stage(_canvas);
        game.init();
        PL.mods.loadModByUrl('http://localhost:3001/mod/player/client.js');
        // PL.mods.addMod('player', game);
 
    }
}