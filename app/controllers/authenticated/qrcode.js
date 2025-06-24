import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedQrcodeController extends Controller {
  @service network;
  @service guest;

  @tracked type = 'main';
}
