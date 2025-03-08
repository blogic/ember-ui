import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedSettingsSystemPasswordController extends Controller {
  @service uconfig;
  @service modal;

  @tracked model = {};
  @tracked bad_password;
  @tracked isDirty;

  @action
  onComplete() {
    this.modal.show();
  }

  @action
  onReallySubmit() {
    this.uconfig.send(['password', this.model.password]);
    history.back();
    this.model = {};
  }

  @action
  onChange() {
    this.isDirty =
      this.model.password && this.model.password == this.model.password2;
    this.bad_password =
      !!this.model.password2 && this.model.password != this.model.password2;
  }

  @action
  onReset() {
    this.model = {};
    this.bad_password = false;
    this.isDirty = false;
  }
}
