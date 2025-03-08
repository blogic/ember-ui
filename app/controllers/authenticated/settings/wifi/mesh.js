import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsWifiMeshController extends Controller {
  @service wifimesh;

  @action onSubmit() {
    this.wifimesh.onSubmit(['ssid', 'key', 'disable']);
  }
}
