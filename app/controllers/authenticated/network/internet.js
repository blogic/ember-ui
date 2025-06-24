import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedInternetMainController extends Controller {
  @service internet;
  @service pattern;
  @service uconfig;

  @action onSubmit() {
    this.internet.onSubmit({
      ipv4: ['subnet', 'addressing', 'gateway', 'dns-servers'],
    });
  }
}
