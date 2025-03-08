import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedCommitRoute extends Route {
  @service uconfig;
  @service router;

  beforeModel() {
    if (this.uconfig.status != 'pending')
      this.router.transitionTo('authenticated.dashboard');
  }
}
