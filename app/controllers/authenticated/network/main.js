import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedNetworkMainController extends Controller {
  @service network;
  @service pattern;
  @service uconfig;

  @action onSubmit() {
    this.network.onSubmit({
      ipv4: ['subnet', 'addressing', 'gateway', 'dns-servers'],
    });
  }
}
