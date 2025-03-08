import Route from '@ember/routing/route';

export default class AuthenticatedSettingsSystemPasswordRoute extends Route {
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.onReset();
  }
}
