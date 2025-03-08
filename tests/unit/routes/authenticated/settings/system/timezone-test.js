import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module(
  'Unit | Route | authenticated/settings/system/timezone',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      let route = this.owner.lookup(
        'route:authenticated/settings/system/timezone',
      );
      assert.ok(route);
    });
  },
);
