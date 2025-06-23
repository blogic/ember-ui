import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedCommitController extends Controller {
  @service uconfig;
  @service router;
  @service netmain;
  @service guest;
  @service mesh;
  @service devices;
  @service unit;
  @service users;
  @service adguard;
  @service ssh;
  @service radio;

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
        this.netmain.load();
        this.mesh.load();
        this.guest.load();
        this.unit.load();
        this.devices.load();
        this.users.load();
        this.ssh.load();
        this.adguard.load();
        this.radio.load();
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
