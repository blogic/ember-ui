import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module('Unit | Service | managed', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:managed');
    assert.ok(service);
  });
});
