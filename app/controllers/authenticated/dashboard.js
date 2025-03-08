import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenticatedDashboardController extends Controller {
  @service router;
  @service uconfig;

  @tracked internet;
  @tracked ethernet;

  load() {
    this.uconfig.request('state', ['internet']).then(
      function (msg) {
        if (msg.data.connected) {
          msg.data.globe_color = 'text-primary';
          msg.data.line_color = 'bg-success';
        } else {
          msg.data.globe_color = 'text-secondary';
          msg.data.line_color = 'bg-warning';
        }
        this.internet = msg.data;
      }.bind(this),
    );
    this.uconfig.request('state', ['ports']).then(
      function (msg) {
        this.ethernet = msg.data;
      }.bind(this),
    );
  }

  @action onLanDevices() {
    this.router.transitionTo('authenticated.devices', 'main', 'list');
  }

  @action onLanUsers() {
    this.router.transitionTo('authenticated.users', 'main', 'list');
  }

  @action onGuestDevices() {
    this.router.transitionTo('authenticated.devices', 'guest', 'list');
  }

  @action onGuestUsers() {
    this.router.transitionTo('authenticated.users', 'guest', 'list');
  }

  @action onManaged(index) {
    this.router.transitionTo('authenticated.managed', index);
  }

  @action
  onSlideChanged(index) {
    this.uconfig.dashboard = index;
    console.log(this.ethernet);
  }
}
