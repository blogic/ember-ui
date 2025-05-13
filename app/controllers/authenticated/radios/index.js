import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RadiosIndexController extends Controller {
  @service radio;
  @service uconfig;

  @tracked isDirty = false;

  @action
  onChange() {
    let band = this.model.band;
    let shadow = this.radio.shadow[band];
    let channel = 'b' + this.model.bandwidth + 'channel';
    let dirty;

    if (this.model.acs != shadow.acs) dirty = true;
    if (this.model.bandwidth != shadow.bandwidth) dirty = true;
    if (this.model[channel] != shadow[channel]) dirty = true;
    this.isDirty = dirty;
  }

  @action
  onSubmit() {
    let channel = 0;
    if (this.model.acs == 'false')
      channel = this.model['b' + this.model.bandwidth + 'channel'];
    this.uconfig.sendModel(
      {
        ssh: [
          'edit',
          'radios',
          this.model.band.toUpperCase(),
          'set',
          'channel',
          channel,
          'channel-width',
          this.model.bandwidth,
        ],
      },
      this,
    );
  }

  @action
  onReset() {
    this.radio.onReset();
  }

  @action
  doUpdate() {
    this.radio.doUpdate();
  }
}
