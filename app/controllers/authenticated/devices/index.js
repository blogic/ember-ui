import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedDevicesIndexController extends Controller {
  @service datamodel;
  @service devices;
  @service uconfig;
  @service router;
  @service users;
  @service guest;

  @tracked network = 'main';

  @action
  onSubmit() {
    if (this.model.form.user)
      this.users.onAddMac(this.model, this.model.form.user);
    if (this.model.form.hostname)
      this.devices.onSetHostname(this.model.mac, this.model.form.hostname);
    if (this.model.shadow.dhcp != this.model.form.dhcp)
      this.devices.onSetDHCP(
        this.model.network,
        this.model.key,
        this.model.form.dhcp,
        this.model.device.ipv4,
      );
  }

  @action
  onDevice(network, mac) {
    this.router.transitionTo('authenticated.devices', network, mac);
  }

  @action
  onChange() {
    this.datamodel.isModelDirty(this.model.form, this.model.shadow, [
      'user',
      'dhcp',
      'hostname',
    ]);
  }

  @action
  onReset() {
    this.model.form.dhcp = this.model.shadow.dhcp;
    delete this.model.form.user;
  }

  @action
  onClickUser(network, user) {
    this.router.transitionTo('authenticated.users', network, user);
  }

  @action
  onChangeNetwork() {
    this.router.replaceWith('authenticated.devices', this.network, 'list');
  }
}
