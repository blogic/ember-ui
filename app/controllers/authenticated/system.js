import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedSystemController extends Controller {
  @service uconfig;
  @service timezone;
  @service notifications;

  @tracked state = {};
  @tracked password;
  @tracked password2;
  @tracked unit;

  load() {
    this.uconfig.state(['system']).then(
      function (state) {
        let total =
          state.data.info.memory.total + state.data.info.memory.shared;
        state.data.info.memory.used_mb = Math.floor(
          (total - state.data.info.memory.free) / (1024 * 1024),
        );
        state.data.info.memory.total_mb = Math.floor(total / (1024 * 1024));
        state.data.info.root.used_mb = Math.floor(
          state.data.info.root.used / 1024,
        );
        state.data.info.root.total_mb = Math.floor(
          state.data.info.root.total / 1024,
        );
        this.state = state.data;
      }.bind(this),
    );

    this.uconfig
      .get({
        unit: ['edit', 'unit', 'show'],
      })
      .then(
        function (msg) {
          this.unit = msg.unit;
        }.bind(this),
      );

    this.password = this.password2 = null;
  }

  @action
  reboot() {
    this.uconfig.action(['reboot']);
  }

  @action
  factory() {
    this.uconfig.action(['factory']);
  }

  @action submitUnit() {
    this.uconfig.set(
      {
        unit: [['edit', 'unit'], ['hostname', 'timezone'], this.unit],
      },
      this.reset,
    );
  }

  @action
  reset() {
    this.load();
  }
}
