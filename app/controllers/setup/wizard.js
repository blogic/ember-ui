import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class SetupWizardController extends Controller {
  @service uconfig;
  @service timezone;

  @tracked pending;
  @tracked model;
  @tracked bad_password;

  load() {
    this.model = {
      name: 'MyHome',
      mode: 'configurable',
      type: 'router',
      guest_wifi: 'enable',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  @action
  submit() {
    this.pending = true;
    this.uconfig.send(['setup-wizard', this.model]);
  }

  @action
  onSubmitPassword() {
    if (this.model.password == this.model.password2) {
      this.bad_password = false;
      this.onChangeSlide('timezone');
    } else {
      this.bad_password = true;
    }
  }

  @action
  onSubmitMode() {
    if (this.model.mode == 'configurable') this.onChangeSlide('type');
    else this.onChangeSlide('managed');
  }

  @action
  onChangePassword() {
    this.bad_password = false;
  }

  @action
  onManaged() {
    this.uconfig.send(['setup-wizard', this.model]);
    this.onChangeSlide('onboarding');
  }

  @action
  onChangeSlide(index) {
    this.uconfig.wizard = index;
  }

  @action
  onRetry() {
    this.onChangeSlide('managed');
  }
}
