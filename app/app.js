import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'webui/config/environment';
import 'ember-power-select/styles';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}
if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  document.documentElement.setAttribute('data-bs-theme', 'dark');
}
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      event.matches ? 'dark' : 'light',
    );
  });
loadInitializers(App, config.modulePrefix);
