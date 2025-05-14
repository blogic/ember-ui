import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wizard-mode', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('model', {
      guest_wifi: 'something',
    });

    await render(hbs`<WizardMode @model={{this.model}}/>`);

    assert
      .dom()
      .hasText(
        'Mode Please choose the mode of the device. Configurable Managed The device will be managed by another configurable device. Continue',
      );
  });
});
