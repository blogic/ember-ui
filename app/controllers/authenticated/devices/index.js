import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedDevicesIndexController extends Controller {
  @service datamodel;
  @service devices;
  @service uconfig;
  @service router;
  @service users;

  @action
  onSubmit() {
    if (this.model.form.user)
      this.users.onAddMac(this.model, this.model.form.user);
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
}
