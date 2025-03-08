import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedSettingsSystemFactoryController extends Controller {
  @service uconfig;
  @service modal;

  @action
  onSubmit() {
    this.modal.show();
  }

  @action
  onFactory() {
    this.uconfig.send(['action', 'factory']);
  }
}
