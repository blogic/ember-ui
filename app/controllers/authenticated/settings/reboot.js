import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedSettingsSystemRebootController extends Controller {
  @service uconfig;
  @service modal;

  @action
  onSubmit() {
    this.modal.show();
  }

  @action
  onReboot() {
    this.uconfig.send(['action', 'reboot']);
  }
}
