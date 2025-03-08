import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wizard-guest', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<WizardGuest />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <WizardGuest>
        template block text
      </WizardGuest>
    `);

    assert.dom().hasText('template block text');
  });
});
