import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wizard-wifi', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<WizardWifi />`);

    assert
      .dom()
      .hasText(
        'Create WiFi Network Personalize your WiFi network name and password WiFi Network name (SSID). WiFi Network Password (PSK). Continue',
      );
  });
});
