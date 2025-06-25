import Helper from '@ember/component/helper';
import { service } from '@ember/service';

export default class HasModule extends Helper {
  @service uconfig;
  compute([module]) {
    return this.uconfig.modules.includes(module);
  }
}
