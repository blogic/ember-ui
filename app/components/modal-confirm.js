import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ModalConfirm extends Component {
  @service modal;

  constructor(...args) {
    super(...args);
    this.modal.setup({
      header: this.args.header,
      body: this.args.body,
      onSubmit: this.args.onSubmit,
    });
  }
}
