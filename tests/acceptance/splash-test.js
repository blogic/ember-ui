import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'webui/tests/helpers';
import { setupIntl, setLocale } from 'ember-intl/test-support';

module('Acceptance | splash', function (hooks) {
  setupApplicationTest(hooks);

  /**
   * this isn't usually needed in acceptance tests, we are only adding it because
   * we want to change the lanugage during the test
   */
  setupIntl(hooks, 'en-us');

  test('visiting /splash', async function (assert) {
    await visit('/splash');

    assert.strictEqual(currentURL(), '/splash');

    assert.dom('[data-test-splash-description]').containsText('Connecting ...');

    await setLocale('de-de');
    assert.dom('[data-test-splash-description]').containsText('Verbinden ...');

    /**
     * This assertion is to show that when there is an existing translation
     * file that is empty, it will get populated from en-us by default because of
     * the setting `fallbackLocale` in `config/ember-intl.js`.
     *
     * Note: this is to support "partial translations" rather than defaulting to en-us
     * if the user's language isn't in the list of supported languages
     */
    await setLocale('en-gb');
    assert.dom('[data-test-splash-description]').containsText('Connecting ...');
  });
});
