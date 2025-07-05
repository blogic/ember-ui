import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenticatedDashboardController extends Controller {
  @service router;
  @service uconfig;
  @service internet;
  @service guest;
  @service mesh;
  @service radio;

  @tracked connection;
  @tracked ethernet;
  @tracked system;
  @tracked loading = true;
  @tracked traffic = {
    labels: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    datasets: [
      {
        label: 'Upload',
        data: [],
        fill: false,
        borderColor: 'rgb(1, 146, 250)',
        tension: 0.4,
      },
      {
        label: 'Download',
        data: [],
        fill: false,
        borderColor: 'rgb(0, 70, 192)',
        tension: 0.4,
      },
    ],
  };

  toFixed(rate, scale) {
    if (rate / scale >= 100) return Math.floor(rate / scale);
    return (rate / scale).toFixed(1);
  }

  scale = {
    scales: {
      y: {
        ticks: {
          callback: function (rate) {
            if (rate > 1024 * 1024 * 1024)
              return this.toFixed(rate, 1024 * 1024 * 1024) + 'GB';
            if (rate > 1024 * 1024)
              return this.toFixed(rate, 1024 * 1024) + 'MB';
            if (rate > 1024) return this.toFixed(rate, 1024) + 'KB';
            return rate + 'B';
          }.bind(this),
        },
      },
    },
  };

  loadTraffic() {
    this.uconfig.request('state', ['traffic']).then(
      function (msg) {
        this.traffic.datasets[0].data = msg.data.up;
        this.traffic.datasets[1].data = msg.data.down;
        this.traffic = { ...this.traffic };
      }.bind(this),
    );
  }

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
        this.connection = msg.data;
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
    this.internet.load();
    this.guest.load();
    this.mesh.load();
    this.loadTraffic();
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
  onManaged(index, action) {
    this.router.transitionTo('authenticated.managed', index, action);
  }

  @action
  onSlideChanged(index) {
    this.uconfig.dashboard = index;
  }
}
