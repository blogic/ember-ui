'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-bare-strings': {
      globalAttributes: [
        '@title',
        '@description',
        '@header',
        '@body',
        '@key',
        '@option1',
        '@option2',
        'placeholder',
      ],
    },
  },
};
