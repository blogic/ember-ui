import { service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedSettingsSystemAdguardController extends Controller {
  @service adguard;

  @action onSubmit() {
    this.adguard.onSubmit();
  }
}
