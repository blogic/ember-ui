import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedUsersIndexController extends Controller {
  @service users;
  @service router;
  @service modal;
  @service datamodel;

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
      header: 'Remove MAC',
      body: 'You are about to remove this MAC from the user.',
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
      header: 'Delete this user',
      body: 'You are about to delete this user.',
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
