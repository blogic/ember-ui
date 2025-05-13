import Datamodel from './datamodel';
import { tracked } from '@glimmer/tracking';

export default class AdguardService extends Datamodel {
  keys = ['enable'];
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
      })
      .then(
        function (msg) {
          this.model = {
            enable: msg.iface.service.includes('adguardhome'),
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
    this.uconfig.sendModel(
      {
        iface: [
          'edit',
          'interface',
          'main',
          this.model.enable == 'true' ? 'add' : 'remove',
          'service',
          'adguardhome',
        ],
      },
      this,
    );
  }
}
