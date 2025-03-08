import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module('Unit | Route | authenticated/users/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:authenticated/users/index');
    assert.ok(route);
  });
});
