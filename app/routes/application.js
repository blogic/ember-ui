import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service intl;

  beforeModel() {
    /**
     * having `en-us` here as the last language will allow us to always fall back
     * to a known language when the navigator.languages doens't contain any language
     * that we support
     */
    this.intl.setLocale([...navigator.languages, 'en-us']);
  }
}
