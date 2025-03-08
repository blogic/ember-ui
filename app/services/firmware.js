import Datamodel from './datamodel';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FirmwareService extends Datamodel {
  @tracked upgrade;
  @tracked state;
  constructor(...args) {
    super(...args);
    this.uconfig.request('state', ['system']).then(
      function (msg) {
        this.model = msg.data;
      }.bind(this),
    );
    this.uconfig.firmware_check().then(
      function (msg) {
        this.upgrade = msg.data;
      }.bind(this),
    );
  }

  @action
  onUpgrade() {
    this.uconfig
      .request('firmware-download', [])
      .then(function (msg) {}.bind(this));
  }
}
