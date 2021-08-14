import {BasicComponent} from "../BasicComponent";
import (/*webpackChunkName: 'control-panel'*/'./styles.scss')

export interface ControlPanelParameters {
  modifiers?: string[]
}

export const ControlPanel = (parameters: ControlPanelParameters = {}) => {
  const {modifiers} = parameters
  const name = 'control-panel'
  return `
    <div class="control-panel${modifiers ? BasicComponent.createModifiers(name,modifiers) : ''}"></div>
  `
}
