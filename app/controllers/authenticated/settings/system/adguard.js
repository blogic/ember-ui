import { service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedSettingsSystemAdguardController extends Controller {
  @service adguard;

  load() {
    console.log('load');
  }

  @action onSubmit() {
    this.adguard.onSubmit();
  }
}
