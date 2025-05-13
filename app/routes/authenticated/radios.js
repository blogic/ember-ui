import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenticatedRadiosRoute extends Route {
  @service radio;

  model(params) {
    return this.radio.model?.[params.band] || 'list';
  }
}
