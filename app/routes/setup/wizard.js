import Route from '@ember/routing/route';

export default class SetupWizardRoute extends Route {
  setupController(controller, ...args) {
    super.setupController(controller, ...args);
    controller.load();
  }
}
