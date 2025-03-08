import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service uconfig;
  @service router;

  setupController(controller, ...args) {
    super.setupController(controller, ...args);
    controller.load();
  }

  beforeModel() {
    this.uconfig.validate_route('logged-out');
  }
}
