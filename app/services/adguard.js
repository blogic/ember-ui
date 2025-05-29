import Datamodel from './datamodel';
import { tracked } from '@glimmer/tracking';

export default class AdguardService extends Datamodel {
  keys = ['enable', 'server1', 'server2'];
  @tracked webui;
  @tracked running;

  constructor(...args) {
    super(...args);
    this.load();
  }

  load() {
    this.uconfig
      .getModel({
        iface: ['edit', 'interface', 'main', 'show'],
        adguard: ['edit', 'services', 'adguardhome', 'show'],
      })
      .then(
        function (msg) {
          this.model = {
            enable: msg.iface.service.includes('adguardhome'),
            server1: msg.adguard.servers?.[0],
            server2: msg.adguard.servers?.[1],
          };
          this.bool_to_string(this.model, 'enable');
          this.doUpdate();
        }.bind(this),
      );
  }

  checkService() {
    this.running = false;
    this.uconfig.request('service', ['check', 'adguardhome']).then(
      function (msg) {
        this.running = msg.data;
        if (msg.data)
          this.webui = 'http://' + window.location.hostname + ':3000/';
        else this.webui = '';
      }.bind(this),
    );
  }

  onSubmit() {
    let msg = {};

    if (this.model.enable != this.shadow.enable)
      msg.iface = [
        'edit',
        'interface',
        'main',
        this.model.enable == 'true' ? 'add' : 'remove',
        'service',
        'adguardhome',
      ];
    if (this.model.enable == 'true') {
      let adguard = [
        'edit',
        'services',
        'adguardhome',
        'set',
        'servers',
        this.model.server1,
      ];
      if (this.model.server2)
        adguard = [adguard, ...['servers', this.model.server2]];
      msg.adguard = adguard;
    }
    this.uconfig.sendModel(msg, this);
  }
}
