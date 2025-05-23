import Datamodel from './datamodel';

export default class MainwifiService extends Datamodel {
  keys = ['ssid', 'key', 'security', 'disable'];

  constructor(...args) {
    super(...args);

    this.uconfig
      .getModel({
        wifimain: ['edit', 'interface', 'main', 'ssid', 'main', 'show'],
      })
      .then(
        function (msg) {
          this.model = msg.wifimain;
          this.doUpdate();
        }.bind(this),
      );
  }

  onSubmit(values) {
    this.uconfig.setModel(
      {
        wifimain: [
          ['edit', 'interface', 'main', 'ssid', 'main'],
          values,
          this.model,
        ],
      },
      this,
    );
  }
}
