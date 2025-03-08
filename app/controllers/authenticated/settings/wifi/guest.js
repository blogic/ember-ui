import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsWifiGuestController extends Controller {
  @service wifiguest;

  @action onSubmit() {
    this.wifiguest.onSubmit({
      ssid: ['ssid', 'key', 'security'],
      iface: ['disable'],
    });
  }
}
