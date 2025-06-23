import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsWifiMainController extends Controller {
  @service wifimain;

  @action onSubmit() {
    this.wifimain.onSubmit({
      wifi: ['ssid', 'key', 'security'],
      ipv4: ['subnet'],
    });
  }
}
