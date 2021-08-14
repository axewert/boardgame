import {GameModel} from "./models/GameModel";
import {GameView} from "./views/GameView";
import {GameController} from "./controllers/GameController";
import (/*webpackChunkName: 'main-styles'*/'./main.scss')
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`/service-worker.js`).then(function(registration) {
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    })
  })
}
const root = document.querySelector('.game') as HTMLElement

const game = new GameController(new GameModel(), new GameView(root))
// @ts-ignore
window.game = game

// //@ts-ignore
// window.demo = new DemoScene(root)