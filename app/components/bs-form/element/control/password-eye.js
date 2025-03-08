import { action } from '@ember/object';
import Control from '../control';
import sizeClass from 'ember-bootstrap/utils/size-class';

export default class FormElementControlPasswordEye extends Control {
  @action
  handleChange(event) {
    this.args.onChange(event.target.value);
  }

  @action
  handleInput(event) {
    this.args.onChange(event.target.value);
  }

  @action
  onClick(id) {
    let input = document.getElementById(id);
    if (input.type === 'password') input.type = 'text';
    else input.type = 'password';
  }

  get sizeClass() {
    return sizeClass('form-control', this.args.size);
  }
}
