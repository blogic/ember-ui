import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedNetworkGuestController extends Controller {
  @service guest;

  @action onSubmit() {
    this.guest.onSubmit({
      ipv4: ['subnet'],
    });
  }
}
