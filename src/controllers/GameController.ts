import {GameModel} from "../models/GameModel";
import {GameView} from "../views/GameView";
import {Observer} from "../utlis/observer/Observer";
import {Action, ActionTypes, ViewClassPanelInfo} from "../typings/observerActionTypes";
import {CharacterModel} from "../models/CharacterModel";

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
        this.gameModel.play([
          {player: 'computer', characters: ['warrior']},
          {player: 'player', characters: ['hunter']}
        ])
        // this.gameView.renderCharacterCreatorScreen(this.gameModel.characters)
        break
      }
      case ActionTypes.ViewClassControlIsClicked: {
        const {className} = action.payload as ViewClassPanelInfo
        this.gameView.setActiveCharacter(this.gameModel.getCharacterByClass(className))
        break
      }
      case ActionTypes.WorldIsReady: {
        this.gameView.renderMainGameScreen()
      }
    }
  }
  update(action: Action) {
    this.handleAction(action)
  }
}