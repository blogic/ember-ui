import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRoute extends Route {
  @service uconfig;
  @service router;

  beforeModel() {
    this.uconfig.validate_route('logged-in');
  }
}
