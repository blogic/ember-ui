import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HeaderSubmit extends Component {
  constructor(...args) {
    super(...args);
    if (this.args.model) this.args.model.isDirty = false;
  }

  @action
  back() {
    if (this.args.model?.onReset) this.args.model.onReset();
    else if (this.args.model?.model?.onReset) this.args.model.model.onReset();

    history.back();
  }

  @action done() {
    if (this.args.model?.onComplete) {
      this.args.model.onComplete();
    } else {
      this.args
        .onSubmit()
        .then(function () {
          history.back();
        })
        .catch(function () {});
    }
  }
}
