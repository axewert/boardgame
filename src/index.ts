import {GameModel} from "./models/GameModel";
import {GameView} from "./views/GameView";
import {GameController} from "./controllers/GameController";
import {DemoScene} from "./assets/demoscene";
import (/*webpackChunkName: 'main-styles'*/'./main.scss')

const root = document.querySelector('.game') as HTMLElement

const game = new GameController(new GameModel(), new GameView(root))
// @ts-ignore
window.game = game

// //@ts-ignore
// window.demo = new DemoScene(root)