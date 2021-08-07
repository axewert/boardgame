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
        this.gameView.renderCreateNewGame()

        break
      }
      case ActionTypes.WorldIsReady: {
        this.gameView.renderWorldScreen()
        break
      }
      case ActionTypes.NewCharacterButtonIsClicked: {
        this.gameView.renderCreateNewCharacter()
        break
      }
      case ActionTypes.CharacterIsCreated: {
        this.gameView.renderCreateNewCharacter()
        break
      }
      case ActionTypes.NewGameIsAccepted: {
        this.gameModel.play([
            {
              player: "player",
              characters: ['hunter']
            }
          ]
        )
      }
    }
  }
  update(action: Action) {
    this.handleAction(action)
  }
}