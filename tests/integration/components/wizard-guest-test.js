import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wizard-guest', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('model', {
      guest_wifi: 'something',
    });

    await render(hbs`<WizardGuest @model={{this.model}}/>`);

    assert
      .dom()
      .hasText(
        'Create Guest WiFi This will allow guests to use a dedicated WiFi network. Enable Disable The Guest WiFi Network will be disabled. Continue',
      );
  });
});
