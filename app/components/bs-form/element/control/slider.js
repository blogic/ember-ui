import { action } from '@ember/object';
import Control from '../control';
import sizeClass from 'ember-bootstrap/utils/size-class';

export default class FormElementControlSlider extends Control {
  @action
  handleChange(event) {
    this.args.onChange(event.target.value);
  }

  @action
  handleInput(event) {
    this.args.onChange(event.target.value);
  }

  get sizeClass() {
    return sizeClass('form-control', this.args.size);
  }
}
