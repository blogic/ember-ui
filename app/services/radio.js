/* eslint-disable no-dupe-keys, prettier/prettier */
import Datamodel from './datamodel';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class RadioService extends Datamodel {
  names = [
    'band',
    'htmode',
    'b20channel',
    'b40channel',
    'b80channel',
    'b160channel',
    'channels',
    'mode',
    'bandwidth',
    'bandwidths',
    'active_channel',
    'freq',
    'utilization',
    'acs',
  ];
  keys = {
    '2g': this.names,
    '5g': this.names,
    '6g': this.names,
  };

  @service router;
  constructor(...args) {
    super(...args);

    this.uconfig.request('state', ['radios']).then(
      function (msg) {
        for (const [k] of Object.entries(msg.data)) {
          if (!msg.data[k]) continue;
          msg.data[k].band = k;
          msg.data[k].acs = msg.data[k].channel == 0 ? 'true' : 'false';
          for (let [b] of Object.entries(msg.data[k].channels))
            msg.data[k][b + 'channel'] = msg.data[k].channels[b].includes(
              msg.data[k].active_channel,
            )
              ? msg.data[k].active_channel
              : msg.data[k].channels[b][0];
        }
        this.model = msg.data;
        this.doUpdate();
      }.bind(this),
    );
    this.doUpdate();
  }

  load() {}

  @action
  onRadio(band) {
    this.router.transitionTo('authenticated.radios', band);
  }
}
