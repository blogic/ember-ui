import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedNetworkMainController extends Controller {
  @service network;

  @action onSubmit() {
    this.network.onSubmit({
      ipv4: ['subnet'],
    });
  }
}
