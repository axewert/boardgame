import {GameModel} from "./models/GameModel";
import {GameView} from "./views/GameView";
import {GameController} from "./controllers/GameController";
import (/*webpackChunkName: 'main-styles'*/'./main.scss')

const root = document.querySelector('.game') as HTMLElement
const game = new GameController(new GameModel(), new GameView(root))
// @ts-ignore
window.game = game
