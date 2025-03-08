import Datamodel from './datamodel';

export default class UnitService extends Datamodel {
  keys = {
    ssh: ['authorized-keys'],
    iface: ['enable'],
  };

  constructor(...args) {
    super(...args);
    this.load();
  }

  load() {
    this.uconfig
      .getModel({
        ssh: ['edit', 'services', 'ssh', 'show'],
        iface: ['edit', 'interface', 'main', 'show'],
      })
      .then(
        function (msg) {
          this.model = { iface: {} };
          this.model.ssh = msg.ssh;
          this.model.iface.enable = 'ssh' in msg.iface.service;
          this.bool_to_string(this.model.iface, 'enable');
          this.doUpdate();
          console.log(this.model);
        }.bind(this),
      );
  }

  onSubmit(values) {
    this.uconfig.setModel(
      {
        ssh: [['edit', 'services', 'ssh'], values, this.model],
        ssh: [['edit', 'services', 'ssh'], values, this.model],

      },
      this,
    );
  }
}
