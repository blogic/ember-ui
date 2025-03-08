import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class DashboardIcon extends Component {
  @service uconfig;
  @action
  onClick() {
    this.uconfig.dashboard = this.args.index;
  }
}
