import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    { ignores: ['dist'] },

    // Node environment override for server files
    {
        files: ['src/server/Server.js'],  // adjust path if needed
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.node,       // Node globals like require, process, etc.
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            env: {
                node: true,                // enable Node environment
            },
        },
        rules: {
            // You can adjust rules here if needed for backend code
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
        },
    },

    // Default config for all JS and JSX (frontend)
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },
]
