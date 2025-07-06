import { module, test } from 'qunit';
import { setupRenderingTest } from 'webui/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Helper | uptime', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it expresses uptime in minute', async function (assert) {
    this.set('uptime', 60);
    await render(hbs`{{uptime this.uptime}}`);
    assert.dom(this.element).hasText('1 Minute');
  });

  test('it expresses uptime in minutes', async function (assert) {
    this.set('uptime', 3599);
    await render(hbs`{{uptime this.uptime}}`);
    assert.dom(this.element).hasText('59 Minutes');
  });

  test('it expresses uptime in hour', async function (assert) {
    this.set('uptime', 3600);
    await render(hbs`{{uptime this.uptime}}`);
    assert.dom(this.element).hasText('1 Hour');
  });

  test('it expresses uptime in hours', async function (assert) {
    this.set('uptime', 86399);
    await render(hbs`{{uptime this.uptime}}`);
    assert.dom(this.element).hasText('23 Hours');
  });

  test('it expresses uptime in day', async function (assert) {
    this.set('uptime', 86400);
    await render(hbs`{{uptime this.uptime}}`);
    assert.dom(this.element).includesText('1 Day');
  });

  test('it expresses uptime in days', async function (assert) {
    this.set('uptime', 172800);
    await render(hbs`{{uptime this.uptime}}`);
    assert.dom(this.element).includesText('2 Days');
  });
});
