import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: { perfectionist, '@stylistic/js': stylisticJs },
        rules: {
            'perfectionist/sort-jsx-props': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'desc',
                    ignoreCase: true,
                    ignorePattern: [],
                    groups: [],
                    customGroups: {},
                },
            ],

            'react/react-in-jsx-scope': 'off',
            'no-unused-vars': 'off',
            'no-unused-expressions': 'off',
            'no-undef-init': 'off',
            'react/display-name': 'off',
            'react/no-unescaped-entities': 'off',
            '@typescript-eslint/space-before-function-paren': ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
    eslintConfigPrettier,
    { ignores: ['resources/js/Components/UI/*'] },
];
