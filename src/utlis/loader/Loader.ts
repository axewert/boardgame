import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'

export interface LoaderTask {
  name: string
  url: string
  onLoad: (res: GLTF) => void
}

export class Loader {
  private readonly loader = new GLTFLoader()
  onPause = false
  queue: LoaderTask[] = []
  lastLoaded: string
  isBusy = false
  addBackgroundTask(newQueue: LoaderTask[]) {
    this.queue.push(...newQueue)
    if(!this.onPause && !this.isBusy) this.runOnBackground()
  }
  runOnBackground() {
    const {url, name, onLoad} = this.queue.pop()
    this.load(url).then(res => {
      this.lastLoaded = name
      onLoad(res)
      if (!this.onPause && this.queue.length) this.runOnBackground()
    })
  }
  loadNow(newQueue: LoaderTask[]) {
    this.onPause = true
    const toLoad = newQueue.map(task => task.name)
    this.queue.filter(task => !toLoad.includes(task.name))
    newQueue.filter(task => task.name !== this.lastLoaded)
    return Promise.all(newQueue.map(task => this.load(task.url)))
      .then(res => {
        this.onPause = false
        this.runOnBackground()
        return res
      })
  }
  async load(url: string) {
    return await this.loader.loadAsync(url).then(gltf => {
      gltf.scene.traverse(child => {
        if (child.type.match(/Mesh/)) {
          (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
            // @ts-ignore
            map: (child as THREE.Mesh).material.map
          })
        }
      })
      return gltf
    })
  }
}