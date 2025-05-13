import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module(
  'Unit | Route | authenticated/settings/system/adguard',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:authenticated/settings/system/adguard',
      );
      assert.ok(route);
    });
  },
);
