import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';
import Service from '@ember/service';

export default class ManagedService extends Service {
  @service uconfig;

  @tracked pin;
  @tracked name;
  @tracked onboarding = {};
  @tracked model;

  load() {
    this.uconfig.request('unet', ['list']).then(
      function (msg) {
        this.model = msg.data;
      }.bind(this),
    );
  }

  @action
  addDevice(name) {
    this.pin = Math.floor(Math.random() * 899999 + 100000);
    this.name = name;
    this.uconfig.onboarding = 'pending';

    this.uconfig
      .request('unet', ['onboard', this.name, this.pin])
      .then(function () {});
  }

  @action
  onDelete(device) {
    this.uconfig.request('unet', ['delete', device]).then(function () {
      history.back();
    });
  }

  @action
  onReboot(device) {
    this.uconfig.request('unet', ['reboot', device]).then(function () {
      history.back();
    });
  }
}
