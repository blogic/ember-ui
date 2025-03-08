import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class AuthenticatedDashboardRoute extends Route {
  @service uconfig;

  updateInterval;

  setupController(controller, ...args) {
    super.setupController(controller, ...args);
    controller.load();
    this.updateInterval = setInterval(() => {
      controller.load();
    }, 15000);
  }

  resetController(_controller, isExiting) {
    if (isExiting) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}
