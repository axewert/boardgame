import {GameModel} from "../models/GameModel";
import {GameView} from "../views/GameView";
import {Observer} from "../utlis/observer/Observer";
import {Action, ActionTypes, ViewClassPanelInfo} from "../typings/observerActionTypes";

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
    this.gameView.renderStartScreen()
  }
  private handleAction(action: Action) {
    switch (action.type) {
      case ActionTypes.NewGameButtonIsClicked: {
        this.gameModel.createNewGame()
        break
      }
      case ActionTypes.ModelDataIsLoaded: {
        this.gameView.renderNewGameCreatorView()
        break
      }
      case ActionTypes.ViewClassControlIsClicked: {
        const {className} = action.payload as ViewClassPanelInfo
        this.gameView.setActiveCharacter(this.gameModel.getCharacterByClass(className))
        break
      }
      case ActionTypes.WorldIsReady: {
        this.gameView.renderWorldScreen()
        break
      }
    }
  }
  update(action: Action) {
    this.handleAction(action)
  }
}