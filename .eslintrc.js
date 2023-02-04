module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
    {
      "files": [
        "*.ts",
        "*.tsx"
      ],
      "rules": {
        "no-mixed-spaces-and-tabs": 0,
        "@typescript-eslint/explicit-function-return-type": "error"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "unused-imports"
  ],
  "rules": {
    "unused-imports/no-unused-imports": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowedNames": [
          "bootstrap",
          "configure",
          "catch"
        ],
        "allowExpressions": true
      }
    ],
    "indent": [
      "error",
      "tab",
      {
        "ignoredNodes": [
          "PropertyDefinition"
        ]
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
}