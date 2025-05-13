import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedSettingsSystemAdguardRoute extends Route {
  @service adguard;
  beforeModel() {
    this.adguard.checkService();
  }
}
