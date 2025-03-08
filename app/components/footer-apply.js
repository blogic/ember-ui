import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class FooterApply extends Component {
  @service uconfig;
  @service router;

  @action
  commit() {
    this.router.transitionTo('authenticated.commit');
  }
}
