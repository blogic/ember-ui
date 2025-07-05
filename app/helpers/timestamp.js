import Helper from '@ember/component/helper';
import { service } from '@ember/service';

export default class Timestamp extends Helper {
  @service intl;
  compute([timestamp]) {
    if (!timestamp) return null;
    return (
      this.intl.formatTime(timestamp * 1000) +
      ' - ' +
      this.intl.formatDate(timestamp * 1000)
    );
  }
}
