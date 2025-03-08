import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module('Unit | Service | mainwifi', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:mainwifi');
    assert.ok(service);
  });
});
