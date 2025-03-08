import Datamodel from './datamodel';

export default class UnitService extends Datamodel {
  keys = ['hostname', 'timezone', 'leds-active'];

  constructor(...args) {
    super(...args);
    this.load();
  }

  load() {
    this.uconfig
      .getModel({
        unit: ['edit', 'unit', 'show'],
      })
      .then(
        function (msg) {
          this.bool_to_string(msg.unit, 'leds-active');
          this.model = msg.unit;
          this.doUpdate();
        }.bind(this),
      );
  }

  onSubmit(values) {
    this.uconfig.setModel(
      {
        unit: [['edit', 'unit'], values, this.model],
      },
      this,
    );
  }
}
