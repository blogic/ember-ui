import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedDevicesIndexController extends Controller {
  @service router;
  @service managed;
  @service modal;

  @tracked new = {};

  @action
  onOnboarding() {
    this.managed.addDevice(this.new.name);
    this.router.replaceWith('authenticated.managed', 'onboarding');
  }

  @action
  onManaged(index) {
    this.router.transitionTo('authenticated.managed', index);
  }

  @action
  onConfirmDel() {
    this.managed.onDelete(this.modal.model.device);
  }

  @action
  onDeviceDel() {
    this.modal.show({
      header: 'Remove the device',
      body: 'You are about to remove this managed device from your network.',
      onSubmit: this.onConfirmDel,
      device: this.model.device,
    });
  }

  @action
  onConfirmReboot() {
    this.managed.onReboot(this.modal.model.device);
  }

  @action
  onDeviceReboot() {
    this.modal.show({
      header: 'Reboot Device',
      body: 'You are about to reboot the managed device.',
      onSubmit: this.onConfirmReboot,
      device: this.model.device,
    });
  }
}
