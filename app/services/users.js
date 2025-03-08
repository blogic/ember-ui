import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Datamodel from './datamodel';
import { tracked } from '@glimmer/tracking';

export default class UserServices extends Datamodel {
  @service uconfig;

  @tracked lookup;
  @tracked mainUsers;
  @tracked guestUsers;

  load() {
    this.uconfig
      .getModel({
        main: ['edit', 'interface', 'main', 'ssid', 'main', 'dump-mpsk'],
        guest: ['edit', 'interface', 'guest', 'ssid', 'guest', 'dump-mpsk'],
      })
      .then(
        function (msg) {
          this.model = msg;
          this.doUpdate();
          this.updateLookup();
          this.updateUsers();
        }.bind(this),
      );
  }

  updateUsers() {
    this.mainUsers = [];
    for (const [user] of Object.entries(this.model.main))
      this.mainUsers.push(user);
    this.guestUsers = [];
    for (const [user] of Object.entries(this.model.guest))
      this.guestUsers.push(user);
  }

  updateLookup() {
    this.lookup = {};
    for (const [, net] of Object.entries(this.model))
      for (const [user, data] of Object.entries(net))
        data?.mac?.forEach((e) => {
          this.lookup[e.toUpperCase()] = user;
        });
  }

  lookupUser(mac) {
    return this.lookup[mac];
  }

  @action
  onDelMAC(model, mac) {
    this.uconfig
      .set([
        'edit',
        'interface',
        model.network,
        'ssid',
        model.network,
        'multi-psk',
        model.key,
        'remove',
        'macaddr',
        mac.toLowerCase(),
      ])
      .then(
        function () {
          this.load();
          this.uconfig.setPending();
          history.back();
        }.bind(this),
      );
  }

  @action
  onAddMac(model, user) {
    this.uconfig
      .set([
        'edit',
        'interface',
        model.network,
        'ssid',
        model.network,
        'multi-psk',
        user,
        'add',
        'macaddr',
        model.key,
      ])
      .then(
        function () {
          this.load();
          this.uconfig.setPending();
          history.back();
        }.bind(this),
      );
  }

  @action
  onSetPassword(model) {
    this.uconfig
      .set([
        'edit',
        'interface',
        model.network,
        'ssid',
        model.network,
        'multi-psk',
        model.user,
        'set',
        'key',
        model.user.key,
      ])
      .then(
        function () {
          this.load();
          this.uconfig.setPending();
          history.back();
        }.bind(this),
      );
  }

  @action
  onUserDel(model) {
    this.uconfig
      .set([
        'edit',
        'interface',
        model.network,
        'ssid',
        model.network,
        'destroy',
        'multi-psk',
        model.key,
      ])
      .then(
        function () {
          this.load();
          this.uconfig.setPending();
          history.back();
        }.bind(this),
      );
  }

  @action
  onUserAdd(model, user) {
    this.uconfig
      .set([
        'edit',
        'interface',
        model.network,
        'ssid',
        model.network,
        'create',
        'multi-psk',
        user.name,
        'key',
        user.key,
      ])
      .then(
        function () {
          this.load();
          this.uconfig.setPending();
        }.bind(this),
      );
  }
}
