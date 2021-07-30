import {GameModel} from "./models/GameModel";
import {StartScreenView} from "./views/StartScreenView";
import {GameView} from "./views/GameView";
import {GameController} from "./views/controllers/GameController";

const root = document.body
const game = new GameController(new GameModel(), new GameView(root))
// @ts-ignore
window.game = game

