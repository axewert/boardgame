import {GameModel} from "./models/GameModel";

const game = new GameModel()
game.init()
// @ts-ignore
window.game = game
