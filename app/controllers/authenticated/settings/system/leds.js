import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticatedSettingsSystemLedsController extends Controller {
  @service unit;

  @action onSubmit() {
    this.unit.onSubmit(['leds-active']);
  }
}
