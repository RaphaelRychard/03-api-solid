👾💻 New task detected... Formatting ESLint commands in markdown 🥷🔧

### **ESLint Commands**

- `npm install eslint --save-dev` // Install ESLint locally in your project
- `npx eslint --init` // Initialize ESLint and create a configuration file (.eslintrc.json)
- `npx eslint .` // Lint files in the current project directory
- `npx eslint . --fix` // Lint files and automatically fix problems
- `npx eslint --config .eslintrc.json .` // Specify a configuration file to use for linting
- `npx eslint src/app.ts` // Lint specific file
- `npx eslint src/` // Lint specific directory
- `npx eslint --parser @typescript-eslint/parser .` // Lint files with a different parser
- `npx eslint --help` // Print the help message with available commands and options
- `npx eslint --version` // Print the version of ESLint
- `npx eslint . -f json > report.json` // Output the results in JSON format
- `npx eslint . -f html > report.html` // Output the results in HTML format
- `npx eslint . --ignore-path .eslintignore` // Use a custom ignore file to exclude files or directories from linting
- `npx eslint . --env node` // Use a specific environment (Node.js)
- `npx eslint . --env browser` // Use a specific environment (browser)
- `npx eslint . --global MY_GLOBAL_VAR` // Set global variables to be considered during linting
- `npx eslint . --debug` // Run ESLint with debugging output (useful for troubleshooting)
- `npx eslint --print-config . | jq '.rules'` // List all available rules (requires jq for JSON parsing)
- `npx lint-staged` // Apply ESLint to staged files (useful in pre-commit hooks)
- `npx eslint . --cache` // Cache linting results to only lint changed files
- `npx eslint . --cache --cache-location /path/to/cache --cache-strategy content` // Clear the cache used by ESLint
- `npx eslint . --parser-options '{"ecmaVersion": 2020}'` // Specify the parser options
- `npx eslint . --rule '{"no-unused-vars": "off"}'` // Only check for syntax errors, not style violations

### **Example in `package.json` Scripts Section**

```json
{
  "scripts": {
    "lint": "eslint .", // Lint all files in the current directory
    "lint:fix": "eslint . --fix", // Lint and automatically fix problems
    "lint:specific": "eslint src/app.ts", // Lint a specific file
    "lint:dir": "eslint src/", // Lint a specific directory
    "lint:format": "eslint . -f json > report.json" // Lint and output the results in JSON format
  }
}
```

---

**Ready to implement or have further questions?** Confirm if this meets your requirements or let me know if you need more details. Let's keep your ESLint setup optimized! 🧑‍💻🔍