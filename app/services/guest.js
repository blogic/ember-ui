import Datamodel from './datamodel';

export default class GuestwifiService extends Datamodel {
  keys = {
    ssid: ['ssid', 'key', 'security', 'isolate-clients'],
    iface: ['disable'],
    ipv4: ['subnet'],
  };

  constructor(...args) {
    super(...args);

    this.uconfig
      .getModel({
        ssid: ['edit', 'interface', 'guest', 'ssid', 'guest', 'show'],
        iface: ['edit', 'interface', 'guest', 'show'],
        ipv4: ['edit', 'interface', 'guest', 'ipv4', 'show'],
      })
      .then(
        function (msg) {
          this.bool_to_string(msg.iface, 'disable');
          this.bool_to_string(msg.ssid, 'isolate-clients');
          this.model = msg;
          this.doUpdate();
        }.bind(this),
      );
  }

  load() {}

  onSubmit(values) {
    this.uconfig.setModel(
      {
        ssid: [
          ['edit', 'interface', 'guest', 'ssid', 'guest'],
          values.ssid,
          this.model.ssid,
        ],
        iface: [['edit', 'interface', 'guest'], values.iface, this.model.iface],
        ipv4: [
          ['edit', 'interface', 'guest', 'ipv4'],
          values.ipv4,
          this.model.ipv4,
        ],
      },
      this,
    );
  }
}
