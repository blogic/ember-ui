import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsWifiMainController extends Controller {
  @service netmain;

  @action onSubmit() {
    this.netmain.onSubmit({
      wifi: ['ssid', 'key', 'security'],
      ipv4: ['subnet'],
    });
  }
}
