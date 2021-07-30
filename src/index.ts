import {GameModel} from "./models/GameModel";
import {StartScreenView} from "./views/StartScreenView";
import {GameView} from "./views/GameView";

const game = new GameModel()
game.init()
// @ts-ignore
window.game = game
const root = document.body
new GameView(root)
