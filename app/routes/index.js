import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router;
  @service uconfig;

  beforeModel(/* transition */) {
    this.uconfig.validate_route('logged-out');
  }
}
