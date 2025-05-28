import Helper from '@ember/component/helper';
import { service } from '@ember/service';

export default class Uptime extends Helper {
  @service intl;

  compute([uptime]) {
    if (!uptime) return null;
    uptime /= 60;
    if (uptime < 60)
      return this.intl.formatMessage(
        {
          defaultMessage:
            '{mathFloorUptime} {mathFloorUptime, plural, =1 {Minute} other {Minutes}}',
        },
        { mathFloorUptime: Math.floor(uptime) },
      );
    uptime /= 60;
    if (uptime < 24)
      return this.intl.formatMessage(
        {
          defaultMessage:
            '{mathFloorUptime} {mathFloorUptime, plural, =1 {Hour} other {Hours}}',
        },
        { mathFloorUptime: Math.floor(uptime) },
      );
    uptime /= 24;
    return this.intl.formatMessage(
      {
        defaultMessage:
          '{mathFloorUptime} {mathFloorUptime, plural, =1 {Day} other {Days}}',
      },
      { mathFloorUptime: Math.floor(uptime) },
    );
  }
}
