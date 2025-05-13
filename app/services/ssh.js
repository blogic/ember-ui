/* eslint-disable no-dupe-keys, prettier/prettier */
import Datamodel from './datamodel';

export default class UnitService extends Datamodel {
  keys = {
    ssh: ['key'],
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
          this.model = {};
          this.model.ssh = { key: msg.ssh['authorized-keys']?.[0] || '' };
          this.model.iface = {
            enable: msg.iface.service.includes('ssh'),
          };
          this.bool_to_string(this.model.iface, 'enable');
          this.doUpdate();
        }.bind(this),
      );
  }

  onSubmit() {
    let msg = {
      ssh: [
        'edit',
        'services',
        'ssh',
        'set',
        'authorized-keys',
        this.model.iface.enable == 'true' ? this.model.ssh.key : '',
        'password-authentication',
        false,
      ],
    };
    if (this.model.iface.enable != this.shadow.iface.enable)
      msg.iface = [
        'edit',
        'interface',
        'main',
        this.model.iface.enable == 'true' ? 'add' : 'remove',
        'service',
        'ssh',
      ];

    this.uconfig.sendModel(msg, this);
  }
}
