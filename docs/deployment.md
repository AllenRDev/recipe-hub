# CI/CD & Deployment

This project is deployed to production on [Laravel Forge](https://forge.laravel.com).
Continuous Integration runs on GitHub Actions and, when it passes on `main`,
triggers a Forge deployment.

## How it works

```
push / PR  ──▶  GitHub Actions "tests" workflow
                  ├─ php      (Pest + Pint)
                  └─ frontend (typecheck, ESLint, Vitest, build)
                        │
                 all green & branch = main
                        ▼
                 deploy job  ──curl──▶  Forge Deploy Hook
                                            │
                                            ▼
                                    Forge deploy script
                                    (pull, install, build, migrate)
```

- CI is defined in `.github/workflows/tests.yml`.
- The `deploy` job only runs for `push` events on `main` and only after both
  the `php` and `frontend` jobs succeed, so a failing test blocks deployment.
- It triggers Forge via a **Deploy Hook** URL stored in the
  `FORGE_DEPLOY_HOOK` GitHub secret (no SSH keys required).

## One-time setup

### 1. Create the Forge Deploy Hook

1. In Forge, open your **site** → **Deployments** tab.
2. Under **Deploy hook**, copy the URL. It looks like:

   ```
   https://forge.laravel.com/servers/123456/sites/789012/deploy/http?token=xxxxxxxx
   ```

3. Keep this URL for the next step. You can use the **Refresh** button at any
   time to rotate the token (remember to update the GitHub secret afterwards).

### 2. Add the GitHub secret

1. GitHub → repository → **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret**.
3. Name: `FORGE_DEPLOY_HOOK`
4. Value: the full deploy hook URL copied above.
5. Save.

### 3. Disable Forge "Push to deploy"

Forge enables *Push to deploy* by default, which deploys on **every** push
regardless of CI. We want deploy-gated-on-tests, so turn it off:

1. Forge → site → **Deployments** tab → **Advanced settings** (or the
   *Push to deploy* toggle on the Deployments tab).
2. Turn **Push to deploy** off.

### 4. Confirm server requirements

The deploy script builds frontend assets on the server, so the Forge server
needs:

- **PHP 8.4** (8.4.1 or newer) with the extensions the app requires
  (`mbstring`, `pdo`, plus your production database driver).
- **Node.js 22** and **npm**.
- A configured production `.env` (database, mail, `APP_URL`, `APP_KEY`, etc.).
- `php artisan storage:link` must be run once (the deploy script handles this).

### 5. Paste the deploy script

Forge → site → **Deployments** tab → edit the **Deploy script** to match:

```bash
cd $FORGE_SITE_PATH
git pull origin $FORGE_SITE_BRANCH

$FORGE_COMPOSER install --no-dev --no-interaction --prefer-dist --optimize-autoloader

npm ci --include=dev
npm run build

php artisan migrate --force
[ -L public/storage ] || php artisan storage:link
php artisan optimize
php artisan queue:restart
```

Why these details:

- `npm ci --include=dev` — the `build` script is `tsc && vite build`, which
  needs devDependencies. If the server sets `NODE_ENV=production`, a plain
  `npm ci` skips them and the build fails.
- `[ -L public/storage ] || php artisan storage:link` — `storage:link` exits
  non-zero when the symlink already exists, which would otherwise fail the
  deploy.
- `php artisan queue:restart` — harmless if no worker is running; required
  again once you add queued jobs and a Forge daemon.

### 6. Test the pipeline

1. Commit and push a change to `main` (this repository already contains the
   workflow).
2. GitHub → **Actions** → the `tests` run should show `PHP`, `Frontend`, then
   `Deploy`.
3. Forge → site → **Deployments** should show a new deployment triggered by the
   hook.

## Zero-downtime deployments (optional)

Zero-downtime deployments can only be enabled when a site is **created**, so an
existing standard site cannot switch to it. If you create a new site with it
enabled, Forge wraps the deploy script in release macros. Use this variant:

```bash
$CREATE_RELEASE()
cd $FORGE_RELEASE_DIRECTORY

$FORGE_COMPOSER install --no-dev --no-interaction --prefer-dist --optimize-autoloader
npm ci --include=dev
npm run build
php artisan migrate --force
[ -L public/storage ] || php artisan storage:link
php artisan optimize
php artisan queue:restart

$ACTIVATE_RELEASE()
$RESTART_QUEUES()
```

Remember to add `storage` (and `database/database.sqlite` if you use SQLite) as
**shared paths** so user uploads and the database persist across releases.

## Optional hardening

- **Health checks** — Forge → site → **Settings** → **Deployments** → enable
  *Health check* and point it at a URL that returns 2xx.
- **Notifications** — Forge → site → **Notifications** to receive deploy
  success/failure via Slack, Discord, Telegram, or email.

## Manual deploys & rollback

- **Manual deploy:** click **Deploy Now** in Forge, or `POST` to the deploy hook
  URL (`curl -X POST "<hook-url>"`).
- **Rollback:** Forge keeps previous deployments. Re-deploy the desired commit
  from the Deployments tab (standard sites) or roll back to a retained release
  (zero-downtime sites).

## Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| `Deploy` job fails with `curl: (22)` | Bad/rotated `FORGE_DEPLOY_HOOK` secret; refresh token in Forge and update the secret. |
| Deploy runs on push but tests failed | *Push to deploy* is still enabled in Forge — disable it. |
| `vite`/`tsc: not found` during build | `NODE_ENV=production` on server skipping devDeps — use `npm ci --include=dev`. |
| `The [public/storage] link already exists` | Guard with `[ -L public/storage ] || …` as above. |
| Stale config/routes after deploy | Ensure `php artisan optimize` runs in the deploy script. |
| Queue jobs not picked up | Add a Forge queue daemon (`php artisan queue:work`) and keep `queue:restart` in the script. |
