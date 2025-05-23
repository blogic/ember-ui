import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service from '@ember/service';

export default class DevicesService extends Service {
  @service uconfig;

  @tracked model;

  constructor(...args) {
    super(...args);
    this.load();
  }

  load() {
    this.uconfig.state(['devices']).then(
      function (msg) {
        msg.data.main ??= {};
        msg.data.guest ??= {};
        this.model = msg.data;
      }.bind(this),
    );
  }

  onLoad() {}

  @action
  doUpdate() {
    for (const [, device] of Object.entries(this.model.object))
      if (device.network == 'main' && device.form.dhcp)
        device.shadow.dhcp = device.form.dhcp;
  }

  @action
  onReset() {
    this.model = null;
    this.load();
  }

  @action
  onSetDHCP(network, mac, dhcp, ip) {
    switch (dhcp) {
      case 'static':
        this.uconfig
          .set([
            'edit',
            'interface',
            network,
            'ipv4',
            'create',
            'dhcp-lease',
            mac,
            'macaddr',
            mac,
            'lease-offset',
            ip.split('.')[3],
            'lease-time',
            '12h',
          ])
          .then(
            function () {
              this.uconfig.setPending();
              this.model[network][mac].dhcp = dhcp;
              history.back();
            }.bind(this),
          );
        break;
      case 'dynamic':
        this.uconfig
          .set([
            'edit',
            'interface',
            network,
            'ipv4',
            'destroy',
            'dhcp-lease',
            mac,
          ])
          .then(
            function () {
              this.uconfig.setPending();
              this.model[network][mac].dhcp = dhcp;
              history.back();
            }.bind(this),
          );
        break;
    }
  }
}
