import Datamodel from './datamodel';

export default class MeshwifiService extends Datamodel {
  keys = ['ssid', 'key', 'security', 'disable'];

  constructor(...args) {
    super(...args);

    this.uconfig
      .getModel({
        wifimesh: ['edit', 'interface', 'main', 'ssid', 'mesh', 'show'],
      })
      .then(
        function (msg) {
          this.bool_to_string(msg.wifimesh, 'disable');
          this.model = msg.wifimesh;
          this.doUpdate();
        }.bind(this),
      );
  }

  load() {}

  onSubmit(values) {
    this.uconfig.setModel(
      {
        wifimesh: [
          ['edit', 'interface', 'main', 'ssid', 'mesh'],
          values,
          this.model,
        ],
      },
      this,
    );
  }
}
