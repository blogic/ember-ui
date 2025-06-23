import Datamodel from './datamodel';

export default class MainwifiService extends Datamodel {
  keys = {
    wifi: ['ssid', 'key', 'security'],
    ipv4: ['subnet', 'addressing'],
  };

  constructor(...args) {
    super(...args);
    this.load();
  }

  load() {
    this.uconfig
      .getModel({
        wifi: ['edit', 'interface', 'main', 'ssid', 'main', 'show'],
        ipv4: ['edit', 'interface', 'main', 'ipv4', 'show'],
      })
      .then(
        function (msg) {
          this.model = msg;
          this.doUpdate();
        }.bind(this),
      );
  }

  onSubmit(values) {
    this.uconfig.setModel(
      {
        wifi: [
          ['edit', 'interface', 'main', 'ssid', 'main'],
          values.wifi,
          this.model.wifi,
        ],
        ipv4: [
          ['edit', 'interface', 'main', 'ipv4'],
          values.ipv4,
          this.model.ipv4,
        ],
      },
      this,
    );
  }
}
