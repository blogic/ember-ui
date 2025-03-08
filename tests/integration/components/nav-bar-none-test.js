import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nav-bar-none', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<NavBarNone />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <NavBarNone>
        template block text
      </NavBarNone>
    `);

    assert.dom().hasText('template block text');
  });
});
