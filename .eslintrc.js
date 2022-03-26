/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line filename-rules/match
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
      browser: false,
      commonjs: true,
      es6: true,
      mocha: true,
    },
    plugins: [
      '@typescript-eslint',
      'import',
      'simple-import-sort',
      'prefer-arrow',
      'jest-formatting',
      'filename-rules',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:import/recommended',
      'plugin:mocha/recommended',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 11,
      sourceType: 'module',
    },
    ignorePatterns: ['**/*.js', 'src/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': ['warn'],
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'require-await': ['error'],
      'eol-last': ['error', 'always'],
      'mocha/no-mocha-arrows': ['warn'],
      'mocha/no-async-describe': ['warn'],
      'mocha/no-identical-title': ['warn'],
      'mocha/no-setup-in-describe': ['warn'],
      'mocha/no-hooks-for-single-case': 0,
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      '@typescript-eslint/ban-types': ['warn'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'class',
            'block',
            'block-like',
            'const',
            'return',
            'if',
            'case',
            'switch',
            'try',
            'throw',
            'expression',
            'while',
          ],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
      'filename-rules/match': ['error', 'camelcase'],
      'jest-formatting/padding-around-describe-blocks': 'error',
      'jest-formatting/padding-around-test-blocks': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': 'error',
    },
    overrides: [
      {
        files: ['*.spec.ts'],
        rules: {
          'prefer-arrow/prefer-arrow-functions': 0,
          'prefer-arrow-callback': 0,
          'func-style': 0,
        },
      },
      {
        files: ['**/*/*.ts'],
        rules: {
          'simple-import-sort/imports': [
            'error',
            {
              groups: [
                //node imports
                [
                  '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
                ],
                //side effect imports
                ['^\\u0000'],
                //anything starting with a letter
                ['^\\w'],
                // Anything not matched in another group.
                ['^'],
                // Anything that starts with a dot.
                ['^\\.'],
              ],
            },
          ],
        },
      },
    ],
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  };
  