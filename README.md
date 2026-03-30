# Build Docs with Sourcey

GitHub Action to build static documentation from OpenAPI specs and markdown using [Sourcey](https://sourcey.com).

## Usage

```yaml
- uses: sourcey/build-docs@v1
  with:
    spec: openapi.yaml
    output: docs
```

### With a config file

```yaml
- uses: sourcey/build-docs@v1
```

Sourcey auto-detects `sourcey.config.ts` in the repo root.

### Deploy to GitHub Pages

```yaml
name: Deploy Docs
on:
  push:
    branches: [main]

permissions:
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: sourcey/build-docs@v1
        with:
          output: docs
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs
      - uses: actions/deploy-pages@v4
```

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `version` | Sourcey version to install | `latest` |
| `config` | Path to sourcey.config.ts | auto-detect |
| `spec` | Path to OpenAPI spec file | |
| `output` | Output directory | `docs` |
| `args` | Additional arguments | |

## Outputs

| Output | Description |
|--------|-------------|
| `output-dir` | Path to the generated documentation |
