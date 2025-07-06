import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module('Unit | Controller | authenticated/wifi/main', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:authenticated/wifi/main');
    assert.ok(controller);
  });
});
