import Datamodel from './datamodel';

export default class GuestwifiService extends Datamodel {
  keys = {
    ssid: ['ssid', 'key', 'security'],
    iface: ['disable'],
  };

  constructor(...args) {
    super(...args);

    this.uconfig
      .getModel({
        ssid: ['edit', 'interface', 'guest', 'ssid', 'guest', 'show'],
        iface: ['edit', 'interface', 'guest', 'show'],
      })
      .then(
        function (msg) {
          this.bool_to_string(msg.iface, 'disable');
          this.model = msg;
          this.doUpdate();
        }.bind(this),
      );
  }

  load() {}

  onSubmit(values) {
    console.log(values);
    this.uconfig.setModel(
      {
        ssid: [
          ['edit', 'interface', 'guest', 'ssid', 'guest'],
          values.ssid,
          this.model.ssid,
        ],
        iface: [['edit', 'interface', 'guest'], values.iface, this.model.iface],
      },
      this,
    );
  }
}
