import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedUsersIndexController extends Controller {
  @service users;
  @service router;
  @service modal;
  @service datamodel;
  @service intl;

  @tracked add = {};
  @tracked duplicate;
  @tracked isDirty = false;

  @action
  onUser(network, user) {
    this.router.transitionTo('authenticated.users', network, user);
  }

  @action
  onMacDel(mac) {
    this.modal.show({
      header: this.intl.formatMessage({ defaultMessage: 'Remove MAC' }),
      body: this.intl.formatMessage({
        defaultMessage: 'You are about to remove this MAC from the user.',
      }),
      onSubmit: this.onConfirmDel,
      mac,
    });
  }

  @action
  onConfirmDel() {
    this.users.onDelMAC(this.model, this.modal.model.mac);
  }

  @action
  onUserDel() {
    this.modal.show({
      header: this.intl.formatMessage({ defaultMessage: 'Delete this user' }),
      body: this.intl.formatMessage({
        defaultMessage: 'You are about to delete this user.',
      }),
      onSubmit: this.onConfirmUser,
    });
  }

  @action
  onConfirmUser() {
    this.users.onUserDel(this.model);
  }

  @action
  onSubmitPassword() {
    this.users.onSetPassword(this.model);
  }

  @action
  onChangePassword() {
    this.datamodel.isModelDirty(this.model.user, this.model.shadow);
  }

  @action
  onSubmitAdd() {
    this.users.onUserAdd(this.model, this.add);
  }

  @action
  onChangeAdd() {
    this.isDirty = this.duplicate =
      !this.users.model[this.model.network][this.add.name];
  }

  @action
  onReset() {
    this.add = {};
  }
}
