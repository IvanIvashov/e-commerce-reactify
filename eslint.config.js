import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
    globalIgnores(['dist']),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    reactHooks.configs['recommended-latest'],
    reactRefresh.configs.vite,
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            'no-console': 'warn',
            eqeqeq: 'warn',
            curly: 'warn',
            'no-else-return': 'warn',
        },
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
        },
    },
    prettierConfig,
])
