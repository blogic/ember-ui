import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wizard-timezone', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<WizardTimezone />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <WizardTimezone>
        template block text
      </WizardTimezone>
    `);

    assert.dom().hasText('template block text');
  });
});
