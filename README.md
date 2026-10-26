# Build Docs with Sourcey

GitHub Action to build static documentation from OpenAPI specs, MCP snapshots, code and Markdown with [Sourcey](https://sourcey.com).

## Usage

```yaml
- uses: sourcey/build-docs@v1
```

Sourcey reads `sourcey.config.ts` in the working directory and writes the site to `docs/`. A project whose `package.json` depends on `sourcey` builds with its own, at the version its lockfile holds, installed with npm, pnpm or Yarn as the lockfile says. Any other config or spec builds with the `version` input, `latest` unless set, and nothing in the project changes.

### A config elsewhere

```yaml
- uses: sourcey/build-docs@v1
  with:
    config: docs/sourcey.config.ts
    output: site
```

### One OpenAPI spec, without a config

```yaml
- uses: sourcey/build-docs@v1
  with:
    spec: openapi.yaml
```

### Deploy to GitHub Pages

```yaml
name: Docs
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
        with:
          # The whole history, so lastUpdated dates each page by its last commit.
          fetch-depth: 0
      - uses: sourcey/build-docs@v1
      - uses: actions/upload-pages-artifact@v5
        with:
          path: docs
      - id: deployment
        uses: actions/deploy-pages@v5
```

Set the repository's Pages source to GitHub Actions. A project site is served beneath the repository's name, so set `baseUrl: "/<repository>"` in the config unless it has a domain of its own. See [Deploying](https://sourcey.com/docs/deploying).

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `version` | Sourcey version to use when the project does not depend on Sourcey itself | `latest` |
| `config` | Path to `sourcey.config.ts`, or the folder holding it | `sourcey.config.ts` in the working directory |
| `spec` | Path or URL of an OpenAPI spec, to build its reference without a config | |
| `output` | Output directory | `docs` |
| `args` | Additional arguments for `sourcey build`, such as `--strictChangelog` | |
| `node-version` | Node.js version to build with; Sourcey needs 22.22.2 or later, 24.15 or later, or 26 | `24` |
| `token` | Token a GitHub navbar link with `stats: true` reads its release, stars and forks with | the workflow's token |

## Outputs

| Output | Description |
|--------|-------------|
| `output-dir` | Path to the generated documentation |
