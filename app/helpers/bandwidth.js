import Helper from '@ember/component/helper';
import { service } from '@ember/service';

export default class Bandwidth extends Helper {
  @service intl;

  compute([rate]) {
    if (rate > 1024 * 1024 * 1024)
      return this.intl.formatMessage(
        { defaultMessage: '{floorRate}Gb' },
        { floorRate: Math.floor(rate / (1024 * 1024 * 1024)) },
      );
    if (rate > 1024 * 1024)
      return this.intl.formatMessage(
        { defaultMessage: '{floorRate}Mb' },
        { floorRate: Math.floor(rate / (1024 * 1024)) },
      );
    if (rate > 1024)
      return this.intl.formatMessage(
        { defaultMessage: '{floorRate}Kb' },
        { floorRate: Math.floor(rate / 1024) },
      );
    return rate;
  }
}
