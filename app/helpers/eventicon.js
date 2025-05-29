export default function eventicon(event) {
  switch (event.object) {
    case 'wifi':
      return 'wifi';
    case 'carrier':
      return 'ethernet';
    case 'client':
      if (event.verb == 'join') return 'person-add';
      return 'person-dash';
    case 'ssh':
      return 'keyboard';
    case 'webui':
      if (event.verb == 'connected') return 'door-open';
      return 'door-closed';
    case 'password':
      return 'key';
    case 'config':
      return 'gear';
    default:
      return 'card-list';
  }
}
