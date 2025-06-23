import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class AuthenticatedEventsController extends Controller {
  @tracked events;
  @service uconfig;

  load() {
    this.uconfig.request('state', ['events']).then(
      function (msg) {
        this.events = msg.data.log.reverse();
      }.bind(this),
    );
  }
}
