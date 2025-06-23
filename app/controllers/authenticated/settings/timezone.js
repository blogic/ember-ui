import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsSystemTimezoneController extends Controller {
  @service timezone;
  @service unit;

  @action onSubmit() {
    this.unit.onSubmit(['timezone']);
  }
}
