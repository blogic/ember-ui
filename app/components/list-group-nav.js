import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ListGroupNav extends Component {
  @service router;

  @action
  click() {
    if (this.args.onClick) this.args.onClick();
    else if (this.args.route) this.router.transitionTo(this.args.route);
  }
}
