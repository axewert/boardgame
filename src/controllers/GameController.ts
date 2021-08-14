import {GameModel} from "../models/GameModel";
import {GameView} from "../views/GameView";
import {Observer} from "../utlis/observer/Observer";
import {Action, ActionTypes} from "../typings/observerActionTypes";
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
    this.gameView.renderStartScreen()
  }
  private handleAction(action: Action) {
    switch (action.type) {
      case ActionTypes.NewGameButtonIsClicked: {
        this.gameModel.createNewGame()
        break
      }
      case ActionTypes.ModelDataIsLoaded: {
        this.gameView.renderCreateNewGame(action.payload as CharacterModel[])
        break
      }
      case ActionTypes.WorldIsReady: {
        this.gameView.renderWorldScreen()
        break
      }
      case ActionTypes.NewCharacterButtonIsClicked: {
        const characters = this.gameModel.getCharactersBuyFaction(action.payload as string)
        this.gameModel.activeCharacter = characters[0]
        this.gameView.openCreateNewCharacter(characters, this.gameModel.activeCharacter)
        break
      }
      case ActionTypes.CharacterIsCreated: {
        this.gameView.closeCreateNewCharacter()
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
        break
      }
      case ActionTypes.CharactersIsLoaded: {

        break
      }
    }
  }
  update(action: Action) {
    this.handleAction(action)
  }
}