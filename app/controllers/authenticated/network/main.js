import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedNetworkMainController extends Controller {
  @service wifimain;

  @action onSubmit() {
    this.wifimain.onSubmit({
      ipv4: ['subnet'],
    });
  }
}
