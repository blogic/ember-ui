import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module('Unit | Controller | authenticated/qrcode', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:authenticated/qrcode');
    assert.ok(controller);
  });
});
