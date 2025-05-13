'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-bare-strings': {
      globalAttributes: ['@title', '@description', 'placeholder'],
    },
  },
};
