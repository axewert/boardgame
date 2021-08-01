import {GameModel} from "../models/GameModel";
import {GameView} from "../views/GameView";
import {Observer} from "../utlis/observer/Observer";
import {Action, ActionTypes} from "../typings/observerActionTypes";
import {GameData} from "../typings/gameDataTypes";

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
    this.gameView.subscribe(this.observer)
    this.gameModel.createNewGame()
  }
  private handleAction(action: Action) {
    switch (action.type) {
      case ActionTypes.ModelDataIsLoaded: {
        const {characters, classes, races} = action.payload as GameData
        this.gameView.renderCharacterCreatorScreen(characters, classes, races)
      }
    }
  }
  update(action: Action) {
    this.handleAction(action)
  }
}