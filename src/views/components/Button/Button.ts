import {BasicComponent} from "../BasicComponent";
import (/*webpackChunkName: 'button'*/'./styles.scss')

export interface ButtonParameters {
  text: string
  disabled?: boolean
  attributes?: {[key:string]: string}[]
  modifiers?: string[]
}


export const Button = ({text, disabled, attributes, modifiers}: ButtonParameters) => {

  const name = 'button'

  return `
      <button 
        class="button${modifiers ? BasicComponent.createModifiers(name,modifiers) : ''}"
        ${disabled ? 'disabled' : ''} 
        ${attributes? BasicComponent.createDataAttributes(attributes) : ''}
      >
        <span class="button__text">${text}</span>
        <span class="button__bg"></span>
      </button>
    `
}