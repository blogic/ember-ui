import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service uconfig;

  @action
  logout() {
    this.uconfig.logout();
  }
}
