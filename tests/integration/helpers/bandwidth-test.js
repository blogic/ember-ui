import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Helper | bandwidth', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it expresses rate in Gb', async function (assert) {
    this.set('rate', 1024 * 1024 * 1024 + 1);
    await render(hbs`{{bandwidth this.rate}}`);
    assert.dom(this.element).includesText('Gb');
  });

  test('it expresses rate in Mb', async function (assert) {
    this.set('rate', 1024 * 1024 + 1);
    await render(hbs`{{bandwidth this.rate}}`);
    assert.dom(this.element).includesText('Mb');
  });

  test('it expresses rate in Kb', async function (assert) {
    this.set('rate', 1024 + 1);
    await render(hbs`{{bandwidth this.rate}}`);
    assert.dom(this.element).includesText('Kb');
  });

  test('it shows rate as is', async function (assert) {
    this.set('rate', 1024);
    await render(hbs`{{bandwidth this.rate}}`);
    assert.dom(this.element).includesText('1024');
  });
});
