import {GameModel} from "../models/GameModel";
import {GameView} from "../views/GameView";
import {Observer} from "../utlis/observer/Observer";

export class GameController {
  private readonly observer = new Observer(this.update.bind(this))
  constructor(
    private readonly gameModel: GameModel,
    private readonly gameView: GameView
  ) {
    this.init()
  }
  init() {
    this.gameModel.subscribe(this.observer)
    this.gameModel.init()
  }
  update() {

  }
}