import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenticatedDashboardController extends Controller {
  @service router;
  @service uconfig;
  @service wifiguest;
  @service wifimesh;
  @service radio;

  @tracked internet;
  @tracked ethernet;
  @tracked system;
  @tracked loading = true;
  @tracked traffic = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        label: 'Upload',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
      {
        label: 'Download',
        data: [165, 259, 8, 50, 60, 90, 240],
        fill: false,
        borderColor: 'rgb(192, 0, 0)',
        tension: 0.3,
      },
    ],
  };

  load() {
    this.uconfig.request('state', ['internet']).then(
      function (msg) {
        if (msg.data.connected) {
          msg.data.globe_color = 'text-primary';
          msg.data.line_color = 'bg-success';
        } else {
          msg.data.globe_color = 'text-secondary';
          msg.data.line_color = 'bg-warning';
        }
        this.internet = msg.data;
      }.bind(this),
    );
    this.uconfig.request('state', ['ports']).then(
      function (msg) {
        this.ethernet = msg.data;
      }.bind(this),
    );
    this.uconfig.request('state', ['system']).then(
      function (msg) {
        this.system = msg.data;
        this.loading = false;
      }.bind(this),
    );
    this.wifiguest.load();
    this.wifimesh.load();
  }

  @action
  onDevices() {
    this.router.transitionTo('authenticated.devices', 'any', 'list');
  }

  @action
  onLanUsers() {
    this.router.transitionTo('authenticated.users', 'main', 'list');
  }

  @action
  onManaged(index) {
    this.router.transitionTo('authenticated.managed', index);
  }

  @action
  onSlideChanged(index) {
    this.uconfig.dashboard = index;
    console.log(this.ethernet);
  }
}
