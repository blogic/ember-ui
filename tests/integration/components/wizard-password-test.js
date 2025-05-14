import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wizard-password', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('onChange', () => {});
    this.set('onSubmit', () => {});

    await render(
      hbs`<WizardPassword @onChange={{this.onChange}} @onSubmit={{this.onSubmit}}/>`,
    );

    assert
      .dom()
      .hasText(
        'Password Setup your login credentials Your new password. Please confirm the password. Continue',
      );
  });
});
