import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | bs-icon-round', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<BsIconRound />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <BsIconRound>
        template block text
      </BsIconRound>
    `);

    assert.dom().hasText('template block text');
  });
});
