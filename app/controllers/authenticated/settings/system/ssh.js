import { service } from '@ember/service';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedSettingsSystemSshController extends Controller {
  @service ssh;

  @action onSubmit() {
    this.ssh.onSubmit(['disable']);
  }
}
