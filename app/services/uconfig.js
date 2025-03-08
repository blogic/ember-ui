import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';
import Service from '@ember/service';

let callbacks = {};

export default class UconfigService extends Service {
  @service('websockets') socketService;
  @service('router') router;
  @service notifications;
  @service devices;
  @service users;

  @tracked authenticated = 'logged-out';
  @tracked status = 'clean';
  @tracked dashboard = 'home';
  @tracked wizard = 'welcome';

  mode;

  id = 1;

  handlers = {
    'login-required': function (msg, t) {
      t.router.transitionTo('login');
    },

    'setup-required': function (msg, t) {
      t.authenticated = 'setup';
      t.router.transitionTo('setup.wizard');
    },

    'wrong-password': function (_msg, t) {
      t.notifications.error('Invalid Password', {
        autoClear: true,
        clearDuration: 2000,
      });
    },

    authenticated: function (msg, t) {
      t.authenticated = 'logged-in';
      t.status = msg[1].pending_changes ? 'pending' : 'clean';
      t.router.transitionTo('authenticated.dashboard');
      t.mode = msg[1].mode;
      t.users.load();
      t.devices.load();
    },

    result: function (msg, t) {
      let callback = callbacks[msg[1]];
      if (callback) {
        callback.fn(msg[2], callback.ctx, t);
        delete callbacks[msg[1]];
      }
    },

    unet: function (msg, t) {
      switch (msg[1]) {
        case 'join_done':
          t.wizard = 'onboarding-done';
          break;
        case 'join_timeout':
          t.wizard = 'onboarding-timeout';
          break;
      }
    },
  };

  get_socket(connect) {
    let path = 'ws://192.168.42.86/config';
    if (connect) return this.socketService.socketFor(path, 'config');
    this.socketService.closeSocketFor(path);
  }

  constructor(...args) {
    super(...args);

    let socket = this.get_socket(true);

    socket.on('open', () => {}, this);

    socket.on(
      'close',
      () => {
        if (this.wizard == 'onboarding-done') return;
        runTask(
          this,
          function () {
            socket.reconnect();
          },
          5000,
        );
        this.authenticated = false;
        this.router.transitionTo('splash');
      },
      this,
    );

    socket.on(
      'message',
      (messageFromSocket) => {
        let msg = JSON.parse(messageFromSocket.data);
        if (typeof msg != 'object') return;

        if (msg[0] != 'ping') console.log('RX: ', msg);

        let handler = this.handlers[msg[0]];
        if (handler) handler(msg, this);
      },
      this,
    );
  }

  send(path) {
    let socket = this.get_socket(true);
    if (socket.readyState() != 1) return;
    console.log('TX: ', path);
    socket.send(path, true);
  }

  request(command, path) {
    path ??= [];
    let id = this.id;
    let msg = [command, this.id++, ...path];

    this.send(msg);

    return new Promise(function (resolve, reject) {
      callbacks[id] = {
        fn: (data, ctx) => {
          if (data.ok) resolve(data, ctx);
          else reject(data);
        },
      };
    });
  }

  set(path) {
    let id = this.id;
    let msg = ['set', this.id++, path];

    this.send(msg);

    return new Promise(function (resolve, reject) {
      callbacks[id] = {
        fn: (data, ctx) => {
          if (data.ok) resolve(data, ctx);
          else reject(data);
        },
      };
    });
  }

  getModel(request) {
    let id = this.id;
    let msg = ['get', this.id++, request];

    this.send(msg);

    return new Promise(function (resolve) {
      callbacks[id] = {
        fn: (data) => {
          resolve(data);
        },
      };
    });
  }

  generate_path(path, keys, model) {
    if (keys && model) {
      path.push('set');
      keys.forEach((e) => {
        path.push(e);
        switch (model[e]) {
          case 'true':
            path.push(true);
            break;
          case 'false':
            path.push(false);
            break;
          default:
            path.push(model[e]);
            break;
        }
      });
    }
    return path;
  }

  setModel(request, model) {
    let id = this.id;
    let path = {};

    for (const [k, v] of Object.entries(request))
      path[k] = this.generate_path(v[0], v[1], v[2]);

    let msg = ['set', this.id++, path];

    this.send(msg);

    callbacks[id] = {
      fn: (data, model, t) => {
        if (!data.ok) {
          console.log('ERROR: ', data.errors);
          t.notifications.error('Failed to apply changes', {
            autoClear: true,
            clearDuration: 2000,
          });
          if (model) model.onReset();
        } else {
          /*t.notifications.success('Applied', {
            autoClear: true,
            clearDuration: 2000,
          });*/
          if (model) model.doUpdate();
          t.status = 'pending';
        }
      },
      ctx: model,
    };
  }

  setPending() {
    this.status = 'pending';
  }

  logout() {
    this.authenticated = 'logged-out';
    this.get_socket(false);
  }

  state(path) {
    return this.request('state', path);
  }

  firmware_check() {
    return this.request('firmware-check', []);
  }

  validate_route(required) {
    if (this.authenticated !== required) {
      switch (this.authenticated) {
        case 'setup':
          this.router.transitionTo('setup.wizard');
          break;
        case 'logged-out':
          this.router.transitionTo('login');
          break;
        case 'logged-in':
          this.router.transitionTo('authenticated.dashboard');
          break;
      }
    }
  }
}
