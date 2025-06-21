import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class AuthenticatedDevicesRoute extends Route {
  @service datamodel;
  @service devices;
  @service router;
  @service users;

  setupController(controller, ...args) {
    super.setupController(controller, ...args);
    this.devices.load(true);
  }

  model(params) {
    let form = {};
    let device = this.devices.model?.[params.network]?.[params.mac];
    let chart;
    if (device?.traffic) {
      chart = {
        labels: [],
        datasets: [{ data: [] }],
      };
      let others = 0;
      for (const [name, data] of Object.entries(device?.traffic)) {
        if (data.bytes < 1024 * 1024) {
          others += data.bytes;
          continue;
        }
        chart.labels.push(name);
        chart.datasets[0].data.push(data.bytes);
      }
      if (others) {
        chart.labels.push('others');
        chart.datasets[0].data.push(others);
      }
    }
    if (device?.dhcp) form.dhcp = device.dhcp;
    return {
      network: params.network,
      key: params.mac,
      device,
      chart,
      owner: this.users.lookupUser(params.mac),
      form,
      shadow: this.datamodel.clone(form),
    };
  }
}
