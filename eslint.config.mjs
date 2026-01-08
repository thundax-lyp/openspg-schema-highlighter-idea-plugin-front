import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

const tsRecommendedRules = (tseslint.configs.recommended && tseslint.configs.recommended.rules) || {}

export default [
    {
        ignores: [
            '*.sh',
            '*.md',
            '*.woff',
            '*.ttf',
            '.vscode',
            '.idea',
            '.husky',
            '.local',
            'dist',
            'node_modules',
            'public',
            'docs',
            'bin'
        ]
    },
    js.configs.recommended,
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true }
            },
            globals: globals.browser
        },
        plugins: {
            '@typescript-eslint': tseslint
        },
        rules: {
            ...tsRecommendedRules,
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/ban-ts-comment': 'off'
        }
    }
]
