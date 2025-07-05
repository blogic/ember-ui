import EmberRouter from '@ember/routing/router';
import config from 'webui/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('authenticated', {}, function () {
    this.route('commit');
    this.route('dashboard');
    this.route('devices', { path: '/devices/:network/:mac' }, function () {});
    this.route('logout');
    this.route('managed', { path: '/managed/:action/:device' }, function () {});
    this.route('network', function () {
      this.route('internet');
      this.route('guest');
      this.route('main');
    });
    this.route('qrcode');
    this.route('radios', { path: '/radios/:band' }, function () {});
    this.route('settings', function () {
      this.route('adguard');
      this.route('events');
      this.route('hostname');
      this.route('leds');
      this.route('password');
      this.route('reboot');
      this.route('ssh');
      this.route('timezone');
      this.route('factory');
      this.route('upgrade');
    });
    this.route('system');
    this.route('upgrade');
    this.route('users', { path: '/users/:network/:user' }, function () {});
    this.route('wifi', function () {
      this.route('guest');
      this.route('main');
      this.route('mesh');
    });
  });
  this.route('login');
  this.route('setup', function () {
    this.route('wizard');
  });
  this.route('logged-out');
});
