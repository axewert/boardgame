import {GameModel} from "../../models/GameModel";
import {GameView} from "../GameView";

export class GameController {
  constructor(
    private readonly gameModel: GameModel,
    private readonly gameView: GameView
  ) {
    this.init()
  }
  init() {
    this.gameModel.init()
  }
}