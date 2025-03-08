import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class AuthenticatedSettingsSystemUpgradeController extends Controller {
  @service firmware;
}
