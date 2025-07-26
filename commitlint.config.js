const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['tech', 'feature', 'fix']],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [0],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(?<type>\w+)\]\s+(?<subject>.*)/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
};

export default config;
