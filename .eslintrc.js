module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    indent: ['error', 4],
    quotes: ['error', 'single'],
    'max-len': 'off',
    'react/react-in-jsx-scope': 'off',
  }
};
