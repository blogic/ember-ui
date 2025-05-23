import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class LoggedOutController extends Controller {
  @service uconfig;
  @service('router') router;

  @action
  onReconnect() {
    this.uconfig.reconnect();
    this.router.transitionTo('login');
  }
}
