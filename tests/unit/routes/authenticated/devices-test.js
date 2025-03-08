import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module('Unit | Route | authenticated/devices', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:authenticated/devices');
    assert.ok(route);
  });
});
