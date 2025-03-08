import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nav-bar-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<NavBarMenu />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <NavBarMenu>
        template block text
      </NavBarMenu>
    `);

    assert.dom().hasText('template block text');
  });
});
