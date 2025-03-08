import Route from '@ember/routing/route';

export default class AuthenticatedSystemRoute extends Route {
  setupController(controller, ...args) {
    super.setupController(controller, ...args);
    controller.load();
  }
}
