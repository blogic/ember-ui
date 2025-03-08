import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class Modal extends Component {
  @service modal;

  @action
  onSubmit() {
    this.modal.visible = false;
    this.modal.model.onSubmit();
  }
}
