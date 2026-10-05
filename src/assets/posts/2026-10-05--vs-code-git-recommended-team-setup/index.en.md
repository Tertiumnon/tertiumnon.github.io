---
publishedAt: 2026-10-05
category: Development
tags: ["VS Code", "Git", "Team Setup", "TypeScript"]
---

# VS Code + Git: Recommended Team Setup

## Why not commit the entire `.vscode` folder?

The `.vscode` folder often contains a mix of:

- Personal developer preferences
- Machine-specific paths
- Local debugging configuration
- Project-wide settings useful for everyone
- Shared tasks and commands

Committing everything usually creates unnecessary Git noise and causes conflicts between team members.

Instead, commit only files that provide value to the entire team.



# Recommended `.gitignore`

```gitignore
# VS Code
.vscode/*

# Keep shared team configuration
!.vscode/settings.json
!.vscode/extensions.json
!.vscode/tasks.json

# Optional: shared launch configs
# !.vscode/launch.json
```

This approach:

✅ Allows project-wide editor settings

✅ Allows shared build/test commands

✅ Allows extension recommendations

✅ Avoids personal machine settings

✅ Reduces merge conflicts



# What should NOT be committed

## Machine-specific debugging

Example:

```json
{
  "configurations": [
    {
      "name": "Debug API",
      "program": "C:\\Users\\John\\Projects\\app\\server.js"
    }
  ]
}
```

Hardcoded paths break on other machines.



## Personal editor preferences

Example:

```json
{
  "editor.fontSize": 18,
  "editor.fontFamily": "JetBrains Mono"
}
```

These are personal choices and should stay local.



## Local environment references

Example:

```json
{
  "terminal.integrated.cwd": "D:\\Work\\MyProject"
}
```

This will not work for other developers.



# What SHOULD be committed

## extensions.json

Provides extension recommendations when a developer opens the project.

`.vscode/extensions.json`

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "eamodio.gitlens",
    "christian-kohler.path-intellisense",
    "usernamehw.errorlens",
    "editorconfig.editorconfig"
  ]
}
```



## Team settings

`.vscode/settings.json`

These settings enforce consistent formatting and behavior across the team.

Example for JavaScript / TypeScript projects:

```json
{
  "editor.formatOnSave": true,

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  "files.eol": "\n",

  "editor.tabSize": 2,
  "editor.insertSpaces": true,

  "typescript.updateImportsOnFileMove.enabled": "always",

  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

Benefits:

- Consistent formatting
- Consistent line endings
- Less lint noise
- Smaller pull requests



# Shared Tasks

Tasks are an excellent candidate for source control because everyone uses the same commands.

`.vscode/tasks.json`

## Angular

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Angular",
      "type": "shell",
      "command": "npm run start",
      "group": "build"
    },

    {
      "label": "Run Tests",
      "type": "shell",
      "command": "npm run test"
    },

    {
      "label": "Lint",
      "type": "shell",
      "command": "npm run lint"
    }
  ]
}
```



## Node.js API

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start API",
      "type": "shell",
      "command": "npm run dev"
    },

    {
      "label": "Build API",
      "type": "shell",
      "command": "npm run build"
    },

    {
      "label": "Test API",
      "type": "shell",
      "command": "npm run test"
    }
  ]
}
```



## Bun Project

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Bun Dev",
      "type": "shell",
      "command": "bun run dev"
    },

    {
      "label": "Bun Test",
      "type": "shell",
      "command": "bun test"
    },

    {
      "label": "Bun Build",
      "type": "shell",
      "command": "bun run build"
    }
  ]
}
```



# Recommended Extensions for Modern TypeScript Teams

## Required

```json
[
  "dbaeumer.vscode-eslint",
  "esbenp.prettier-vscode",
  "editorconfig.editorconfig"
]
```

Purpose:

- ESLint
- Formatting
- EditorConfig support



## Highly Recommended

```json
[
  "eamodio.gitlens",
  "usernamehw.errorlens",
  "christian-kohler.path-intellisense",
  "streetsidesoftware.code-spell-checker"
]
```

Purpose:

- Better Git history
- Inline error visibility
- Import path completion
- Documentation spelling



## Angular Teams

```json
[
  "angular.ng-template"
]
```



## Node.js Teams

```json
[
  "ms-vscode.js-debug-nightly"
]
```



## Docker Teams

```json
[
  "ms-azuretools.vscode-docker"
]
```



# Typical Team Structure

```text
project/
│
├── .gitignore
├── package.json
│
└── .vscode/
    ├── extensions.json
    ├── settings.json
    └── tasks.json
```



# Recommended Final Configuration

`.gitignore`

```gitignore
.vscode/*

!.vscode/settings.json
!.vscode/extensions.json
!.vscode/tasks.json
```

Most professional TypeScript, Angular, Node.js, React, and Bun teams use a variation of this setup. It keeps useful workspace configuration in Git while preventing personal VS Code preferences from polluting the repository.
