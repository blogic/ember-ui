import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module('Unit | Service | dhcp', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:dhcp');
    assert.ok(service);
  });
});
