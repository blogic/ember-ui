import { module, test } from 'qunit';
import { setupTest } from 'webui/tests/helpers';

module(
  'Unit | Controller | authenticated/settings/reboot',
  function (hooks) {
    setupTest(hooks);

    // TODO: Replace this with your real tests.
    test('it exists', function (assert) {
      let controller = this.owner.lookup(
        'controller:authenticated/settings/reboot',
      );
      assert.ok(controller);
    });
  },
);
