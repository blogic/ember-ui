import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedNetworkMainController extends Controller {
  @service netmain;

  @action onSubmit() {
    this.netmain.onSubmit({
      ipv4: ['subnet'],
    });
  }
}
