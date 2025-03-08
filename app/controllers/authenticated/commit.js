import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedCommitController extends Controller {
  @service uconfig;
  @service router;
  @service wifimain;
  @service wifiguest;
  @service wifimesh;
  @service devices;
  @service unit;
  @service users;

  @service notifications;

  @action
  commit() {
    this.uconfig.status = 'applying';

    this.uconfig.request('commit').then(
      function () {
        this.uconfig.status = 'clean';
      }.bind(this),
    );
  }

  @action
  reset() {
    this.uconfig.request('command', ['reset']).then(
      function () {
        this.wifimain.onReset();
        this.wifimesh.onReset();
        this.wifiguest.onReset();
        this.unit.onReset();
        this.devices.onReset();
        this.users.onReset();
        this.uconfig.status = 'clean';
        this.router.transitionTo('authenticated.dashboard');
      }.bind(this),
    );
  }

  @action
  back() {
    history.back();
  }
}
