import Route from '@ember/routing/route';

export default class AuthenticatedEventsRoute extends Route {

  setupController(controller, ...args) {
    super.setupController(controller, ...args);
    controller.load();
  }
}
