import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service uconfig;

  @tracked password;

  load() {
    this.password = '';
  }

  @action
  submit() {
    this.uconfig.send(['authenticate', 'admin', this.password]);
  }
}
