import * as THREE from 'three'
import {Observer} from "../utlis/observer/Observer";
import {Action, ActionTypes} from "../typings/observerActionTypes";
import {Subject} from "../utlis/observer/Subject";
import {CharacterInfoView} from "./CharacterInfoView/CharacterInfoView";
import {CharacterView} from "./CharacterView";
import {CharacterModel} from "../models/CharacterModel";
import {CharacterSelectorPanel} from "./ui/CharacterSelectorPanel/CharacterSelectorPanel";
import {WorldView} from "./WorldView";
import {StartScreenView} from "./StartScreenView/StartScreenView";
import {BasicView} from "./ui/BasicView";

export class GameView {
  private readonly root: HTMLElement
  private readonly subject = new Subject()
  private characterInfo: CharacterInfoView
  private readonly clock = new THREE.Clock()
  private activeCharacter: CharacterView
  private readonly characters: CharacterView[] = []
  private characterCreator: CharacterSelectorPanel
  private worldView: WorldView
  private activeView: BasicView
  private needsUpdate = false
  constructor(root: HTMLElement) {
    this.root = root
  }

  renderStartScreen() {
    this.clearScreen()
    this.activeView = new StartScreenView(
      {
        listeners: [
          {
            name: 'click',
            handler: this.handleStartScreenClick.bind(this)
          }
        ]
      }
    )
    this.root.append(this.activeView.getDomElement())
  }

  clearScreen() {
    if(this.activeView) this.activeView.destroy()
    this.root.innerHTML = ''
  }

  handleStartScreenClick(evt: MouseEvent) {
    if ((evt.currentTarget as HTMLElement).dataset.type === 'new-game') {
      this.notify({
        type: ActionTypes.NewGameButtonIsClicked
      })
    }
  }
  renderNewGameCreatorView() {
    this.clearScreen()
    
  }
  renderCharacterSelectorScreen(characters: CharacterModel[]) {
    this.clearScreen()
    this.activeView = new CharacterInfoView()
  }
  renderWorldScreen() {
    this.createWorld()
    this.renderWorld()
    this.render()
  }

  createWorld() {
    this.worldView = new WorldView(this.root)
  }
  renderWorld() {

  }
  updateWorld() {

  }
  setActiveCharacter(character: CharacterModel) {
    this.getCharacter(character).then(char => {
      this.activeCharacter = char

    })
  }

  handleCreatorPanelClick(e: MouseEvent) {
    const className = (e.target as HTMLElement).dataset.charclass
    if(className === this.activeCharacter.className) return false
    this.notify({
      type: ActionTypes.ViewClassControlIsClicked,
      payload: {
        className
      }
    })
  }

  async getCharacter({name, className, race, gender}: CharacterModel) {
    const isExist = this.characters.find(char => {
      return char.name === name
    })
    if(isExist) return isExist
    const character =  await new CharacterView(name, className, race, gender).create()
    this.characters.push(character)
    return character
  }

  subscribe(observer: Observer) {
    this.subject.subscribe(observer)
  }

  unsubscribe(observer: Observer) {
    this.subject.unsubscribe(observer)
  }

  notify(action: Action) {
    this.subject.notify(action)
  }

  render() {
    if(!this.needsUpdate) return false
    requestAnimationFrame(this.render.bind(this))
    if (this.activeCharacter) this.activeCharacter.render(this.clock.getDelta())
  }
}