import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsWifiGuestController extends Controller {
  @service guest;

  @action onSubmit() {
    this.guest.onSubmit({
      ssid: ['ssid', 'key', 'security'],
      iface: ['disable'],
    });
  }
}
