import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenticatedQrcodeGuestController extends Controller {
  @service wifiguest;
}
