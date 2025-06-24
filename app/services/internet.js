import Datamodel from './datamodel';

export default class InternetService extends Datamodel {
  keys = {
    ipv4: ['subnet', 'addressing', 'gateway', 'dns-servers'],
  };

  constructor(...args) {
    super(...args);
    this.load();
  }

  load() {
    this.uconfig
      .getModel({
        ipv4: ['edit', 'interface', 'uplink', 'ipv4', 'show'],
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
        ipv4: [
          ['edit', 'interface', 'uplink', 'ipv4'],
          values.ipv4,
          this.model.ipv4,
        ],
      },
      this,
    );
  }
}
