import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class AuthenticatedUSersRoute extends Route {
  @service users;
  @service datamodel;
  @service devices;

  model(params) {
    let macs = {};
    this.users.model?.[params.network]?.[params.user]?.mac?.forEach((e) => {
      let mac = e.toUpperCase();
      macs[mac] = this.devices.model?.[params.network]?.[mac]?.hostname || mac;
    });
    return {
      network: params.network,
      key: params.user,
      user: this.users.model?.[params.network]?.[params.user],
      macs,
      shadow: this.datamodel.clone(
        this.users.model?.[params.network]?.[params.user],
      ),
    };
  }
}
