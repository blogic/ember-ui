import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BsIcon extends Component {
  @service router;

  @action
  click() {
    if (this.args.back) history.back();
    else if (this.args.onClick) this.args.onClick();
    else if (this.args.route) this.router.transitionTo(this.args.route);
  }
}
