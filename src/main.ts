import App from './core/app'
import PlayerClientMod from './core/mod/core-mods/player/main.c';
import './style.css'

const app1 = new App("default app");
app1.init();
app1.setFulLSize();
app1._mod?.registerMod("player",PlayerClientMod);
app1.run();