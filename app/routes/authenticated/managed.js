import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class AuthenticatedManagedRoute extends Route {
  @service managed;
  @service datamodel;

  setupController(controller, ...args) {
    super.setupController(controller, ...args);
    this.managed.load();
  }

  model(params) {
    let info = {};
    let form = {};
    if (this.managed.model?.[params.device]) {
      let device = this.managed.model?.[params.device];
      info.endpoint = device.endpoint?.split(':')[0];
      info.connected = device.connected ? 'Connected' : 'Disconnected';
      info.rx_bytes = device.rx_bytes;
      info.tx_bytes = device.tx_bytes;
      info.model = device.model;
      info.uptime = device.uptime;
      info.free = device.free;
      info.total = device.total;
      info.revision = device.revision;
      info.ports = device.ports;
      info.thermal = device.thermal;
    }
    return {
      device: params.device,
      action: params.action,
      info,
      form,
      shadow: this.datamodel.clone(form),
    };
  }
}
