import Helper from '@ember/component/helper';
import { service } from '@ember/service';

export default class Uptime extends Helper {
  @service intl;

  compute([uptime]) {
    if (!uptime) return null;
    uptime /= 60;
    if (uptime < 60)
      return this.intl.formatMessage(
        { defaultMessage: '{mathFloorUptime} Minutes' },
        { mathFloorUptime: Math.floor(uptime) },
      );
    uptime /= 60;
    if (uptime < 24)
      return this.intl.formatMessage(
        { defaultMessage: '{mathFloorUptime} Hours' },
        { mathFloorUptime: Math.floor(uptime) },
      );
    uptime /= 24;
    return this.intl.formatMessage(
      { defaultMessage: '{mathFloorUptime} Days' },
      { mathFloorUptime: Math.floor(uptime) },
    );
  }
}
