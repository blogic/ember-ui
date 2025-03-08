import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenticatedQrcodeMainController extends Controller {
  @service wifimain;
}
