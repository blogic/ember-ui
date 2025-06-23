import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsWifiMeshController extends Controller {
  @service mesh;

  @action onSubmit() {
    this.mesh.onSubmit(['ssid', 'key', 'disable']);
  }
}
