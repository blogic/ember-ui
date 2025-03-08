import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service from '@ember/service';

export default class ModalService extends Service {
  @tracked model = {};
  @tracked visible = false;

  @action
  setup(model) {
    this.model = model;
    this.visible = false;
  }

  @action
  show(model) {
    if (model) this.model = model;
    this.visible = true;
  }
}
