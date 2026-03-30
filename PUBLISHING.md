# Publishing Guide for @pixielity/container

This guide explains how to publish the package to npm using GitHub Actions.

## Prerequisites

### 1. npm Account Setup
- Create an account at [npmjs.com](https://www.npmjs.com)
- Verify your email address
- Enable 2FA (Two-Factor Authentication) for security

### 2. Generate npm Access Token
1. Log in to [npmjs.com](https://www.npmjs.com)
2. Click your profile icon → "Access Tokens"
3. Click "Generate New Token" → "Classic Token"
4. Select "Automation" type (for CI/CD)
5. Copy the token (starts with `npm_...`)

### 3. Add npm Token to GitHub Secrets
1. Go to your repository: https://github.com/pixielity-inc/container
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

## Publishing Methods

### Method 1: Automatic Publishing (Recommended)

#### Using Git Tags
```bash
# Update version in package.json first
npm version patch  # or minor, or major

# Push the tag to trigger publishing
git push --follow-tags
```

The GitHub Action will automatically:
- Build the package
- Run tests
- Publish to npm

#### Manual Trigger
1. Go to: https://github.com/pixielity-inc/container/actions
2. Click "Publish to npm" workflow
3. Click "Run workflow"
4. Select branch and click "Run workflow"

### Method 2: Manual Publishing

```bash
# Build the package
npm run build

# Login to npm (one-time)
npm login

# Publish
npm publish --access public
```

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.x): Bug fixes
  ```bash
  npm version patch
  ```

- **Minor** (1.x.0): New features (backward compatible)
  ```bash
  npm version minor
  ```

- **Major** (x.0.0): Breaking changes
  ```bash
  npm version major
  ```

## Pre-Publish Checklist

Before publishing, ensure:

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] README.md is up to date
- [ ] CHANGELOG.md is updated
- [ ] Version number is bumped
- [ ] No uncommitted changes

## Verify Publication

After publishing:

1. Check npm: https://www.npmjs.com/package/@pixielity/container
2. Test installation:
   ```bash
   npm install @pixielity/container
   ```

## Troubleshooting

### "You must be logged in to publish packages"
- Ensure `NPM_TOKEN` secret is set in GitHub
- Token must have "Automation" or "Publish" permissions

### "You do not have permission to publish"
- Ensure you're a member of the `@pixielity` organization on npm
- Check package name is available

### "Package name too similar to existing package"
- Choose a different package name
- Or request ownership of the existing package

## Webhook Configuration (Optional)

To receive notifications when packages are published:

### Discord Webhook
1. Create a Discord webhook in your server
2. Add to GitHub repository secrets as `DISCORD_WEBHOOK_URL`
3. Update `.github/workflows/publish.yml` to include notification step

### Slack Webhook
1. Create a Slack incoming webhook
2. Add to GitHub repository secrets as `SLACK_WEBHOOK_URL`
3. Update `.github/workflows/publish.yml` to include notification step

## CI/CD Workflow

The repository includes two workflows:

### 1. CI Workflow (`.github/workflows/ci.yml`)
- Runs on every push and PR
- Tests on Node.js 18 and 20
- Runs build and tests
- Checks code formatting

### 2. Publish Workflow (`.github/workflows/publish.yml`)
- Runs on version tags (v*)
- Can be manually triggered
- Builds and publishes to npm
- Requires `NPM_TOKEN` secret

## Support

For issues or questions:
- GitHub Issues: https://github.com/pixielity-inc/container/issues
- npm Package: https://www.npmjs.com/package/@pixielity/container
