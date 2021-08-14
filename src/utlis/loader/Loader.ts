import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import {ifError} from "assert";

export interface LoaderTask {
  name: string
  url: string
  onLoad: (res: GLTF) => void
}

export class Loader {
  private readonly loader = new GLTFLoader()
  onPause = false
  loadQueue: LoaderTask[] = []
  fetchQueue: LoaderTask[] = []
  lastLoaded: string
  isBusy = false
  addBackgroundTask(newQueue: LoaderTask[]) {
    this.loadQueue.push(...newQueue)
    if(!this.onPause && !this.isBusy) this.runOnBackground()
  }
  runOnBackground() {
    const {url, name, onLoad} = this.loadQueue.pop()
    this.load({url, name, onLoad}).then(res => {
      this.lastLoaded = name
      onLoad(res)
      if (!this.onPause && this.loadQueue.length) this.runOnBackground()
    })
  }
  loadNow(newQueue: LoaderTask[]) {
    this.onPause = true
    const toLoad = newQueue.map(task => task.name)
    this.loadQueue.filter(task => !toLoad.includes(task.name))
    newQueue.filter(task => task.name !== this.lastLoaded)
    return Promise.all(newQueue.map(task => {
        return this.load(task)
      }))
      .then(res => {
        this.onPause = false
        if(this.loadQueue) this.runOnBackground()
        return res
      })
  }
  fetchOnBackground(newFetchQueue: LoaderTask[]) {
    this.fetchQueue.push(...newFetchQueue)
    if (!this.onPause && !this.isBusy) this.fetch(this.fetchQueue.pop())
  }
  async fetch({url,name,onLoad}: LoaderTask) {
    fetch(url).then(() => {
      if (this.fetchQueue) this.fetch(this.fetchQueue.pop())
    })
  }
  async load({url,name,onLoad}: LoaderTask) {
    return await this.loader.loadAsync(url).then(gltf => {
      gltf.scene.name = name
      gltf.scene.traverse(child => {
        if (child.type.match(/Mesh/)) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            // @ts-ignore
            map: (child as THREE.Mesh).material.map,
            transparent: true,
            metalness: 0.1
          })
        }
      })
      return gltf
    })
  }


}