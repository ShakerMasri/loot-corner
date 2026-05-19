# Loot Corner

Loot Corner is a full-stack e-commerce web application for selling collectible products such as figures, posters, and accessories.

This project is being prepared as a real client-ready application, not just a demo. The backend, authentication, authorization, environment configuration, deployment flow, and production safety checks should be treated seriously before launch.

## Tech Stack

- Next.js App Router
- TypeScript
- React
- PostgreSQL
- Prisma ORM
- Better Auth
- Zod
- Cloudinary for product image uploads
- Upstash Redis for production-safe rate limiting
- Nodemailer / SMTP for email verification and password reset emails
- Docker Compose for local PostgreSQL development
- ESLint and Prettier
- Vitest and React Testing Library for unit/component tests
- Playwright for E2E browser tests

## Current Production-Hardening Status

Completed:

- Better Auth migration
- Rate limiting
- Dedicated resend verification email rate limiting
- Security headers
- Admin/customer authorization audit
- Product API hardening
- Upload API hardening
- Category API hardening
- Order API hardening
- Cart API hardening
- Profile API hardening
- CSRF / same-origin checks on protected mutation routes
- Prisma migration-based database workflow
- Environment validation through `src/env.js`
- Unit testing setup with Vitest and React Testing Library
- Unit tests for validation schemas, product APIs, CSRF/same-origin checks, admin authorization, middleware behavior, and rate limiting
- Playwright E2E testing setup
- Staging-safe E2E tests for public pages, customer auth, cart, orders, admin access, and admin orders read-only behavior
- Playwright auth-state reuse for stable customer/admin E2E tests

Not started yet:

- Caching

## Main Features

### Customer Features

- Register and log in
- View public products
- View product details
- Add products to cart
- Update cart item quantities
- Remove cart items
- Place cash-on-delivery orders
- View own orders
- View and update profile information

### Admin Features

- Admin dashboard
- Manage products
- Upload product images
- Archive and restore products
- Manage product stock
- Manage categories
- View customer orders
- Update order status
- Update payment status
- Add internal order notes

## Security Model

This project follows these rules:

- Never trust the client.
- Frontend checks are only for user experience.
- Protected data and protected actions must be checked on the server.
- Admin actions must require server-side admin authorization.
- Customer data must be scoped to the logged-in user.
- API routes must validate request bodies, route params, and query params.
- API routes must not return password hashes, tokens, secrets, raw database errors, or stack traces.
- Secrets must stay server-side.
- Only variables starting with `NEXT_PUBLIC_` are exposed to the browser.
- This project should not expose secrets through `NEXT_PUBLIC_` variables.
- Prisma is used for database access instead of unsafe raw SQL.
- Passwords must never be stored in plain text.
- Rate limiting should be enabled for auth routes, public APIs, and protected mutation routes.
- Resend verification email requests must have a stricter backend rate limit, not only a frontend cooldown.
- CSRF or same-origin checks should protect cookie-based state-changing requests.

## Requirements

Recommended:

- Node.js 20+
- npm
- Docker Desktop, for local PostgreSQL
- PostgreSQL, local through Docker or hosted in production
- Cloudinary account for production image uploads
- Upstash Redis database for production rate limiting
- SMTP provider for production emails

## Environment Variables

Create a `.env` file from `.env.example`.

On macOS/Linux/Git Bash:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Never commit `.env` or any file containing real secrets.

Required variables:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"

# Better Auth
BETTER_AUTH_SECRET="long-random-production-secret-at-least-32-characters"
BETTER_AUTH_URL="http://localhost:3000"

# App URL used when generating email links
APP_URL="http://localhost:3000"

# SMTP email settings
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM_EMAIL=""
SMTP_FROM_NAME="Loot Corner"

# Email delivery mode
# Use "log" for local/staging without real SMTP sending.
# Use "smtp" for production after configuring a real SMTP provider.
EMAIL_DELIVERY_MODE="log"

# Upstash Redis rate limiting
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Cloudinary product image uploads
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
CLOUDINARY_PRODUCT_FOLDER="loot-corner/products"
```

For production, use the real deployed HTTPS domain:

```env
BETTER_AUTH_URL="https://your-domain.com"
APP_URL="https://your-domain.com"
```

Do not use local URLs in production:

```env
BETTER_AUTH_URL="http://localhost:3000"
APP_URL="http://localhost:3000"
```

## Local Development Setup

Install dependencies:

```bash
npm install
```

Start the local PostgreSQL database:

```bash
docker compose up -d
```

Run local Prisma migrations:

```bash
npm run db:migrate:dev
```

Start the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

## Database and Prisma

Use this for local development migrations:

```bash
npm run db:migrate:dev
```

Use this for staging or production deployments:

```bash
npm run db:migrate:deploy
```

Generate the Prisma client:

```bash
npm run db:generate
```

Open Prisma Studio locally:

```bash
npm run db:studio
```

Do not use `prisma db push` against production.

`db push` is only for local development or quick schema experiments. Production and staging should use committed Prisma migrations with `prisma migrate deploy`.

## Useful Scripts

Run unit tests once:

```bash
npm run test:run
```

Run unit tests in watch mode:

```bash
npm run test
```

Generate test coverage:

```bash
npm run test:coverage
```

Run Playwright E2E tests:

```bash
npm run test:e2e
```

Run Playwright E2E tests in headed browser mode:

```bash
npm run test:e2e:headed
```

Open Playwright UI mode:

```bash
npm run test:e2e:ui
```

Open the last Playwright HTML report:

```bash
npm run test:e2e:report
```

Start the local development server:

```bash
npm run dev
```

Build the production app:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

Run ESLint:

```bash
npm run lint
```

Run TypeScript type checking:

```bash
npm run typecheck
```

Run linting and type checking:

```bash
npm run check
```

Recommended local pre-merge checks:

```bash
npm run test:run
npm run typecheck
npm run lint
npm run build
```

Run local development migrations:

```bash
npm run db:migrate:dev
```

Apply committed migrations in staging or production:

```bash
npm run db:migrate:deploy
```

Generate the Prisma client:

```bash
npm run db:generate
```

Open Prisma Studio:

```bash
npm run db:studio
```

## Docker Development Database

The Docker Compose setup is for local development only.

Example local database URL:

```env
DATABASE_URL="postgresql://loot_corner:loot_corner_dev_password@localhost:5436/loot_corner"
```

Do not use the local Docker database for production.

Production should use a hosted PostgreSQL database with a private connection string stored in the deployment provider's secret/environment settings.

## Testing Flow

Recommended testing order:

```txt
unit tests -> manual staging testing -> Playwright E2E tests -> small load/smoke test after tooling/license review
```

Current unit testing stack:

- Vitest
- React Testing Library
- jsdom
- mocked Prisma / external services where needed

Current E2E testing stack:

- Playwright
- Chromium-only browser project for now
- staging-safe base URL
- one worker to avoid free-plan abuse
- saved Playwright auth state for customer/admin sessions
- screenshots, video, and traces only for failures/retries

Unit tests should not touch the staging or production database.

Playwright E2E tests currently run against staging or localhost only. The staging database contains disposable test data only.

Do not run heavy load tests against free staging services. For staging, keep any future load/smoke testing small and safe.

## Playwright E2E Testing

Playwright E2E tests live in:

```txt
tests/e2e/
```

Run all E2E tests:

```bash
npm run test:e2e
```

Run with a visible browser:

```bash
npm run test:e2e:headed
```

Open Playwright UI mode:

```bash
npm run test:e2e:ui
```

Open the latest HTML report:

```bash
npm run test:e2e:report
```

### Required Local E2E Environment

Create this local-only file:

```txt
.env.e2e.local
```

Required values:

```env
E2E_BASE_URL="https://loot-corner.onrender.com"

E2E_CUSTOMER_EMAIL="test-customer@example.com"
E2E_CUSTOMER_PASSWORD="local-test-password"

E2E_ADMIN_EMAIL="test-admin@example.com"
E2E_ADMIN_PASSWORD="local-test-password"

E2E_PRODUCT_PATH="/products/example-product"
E2E_ORDER_PRODUCT_PATH="/products/example-product-with-stock"
```

Do not commit `.env.e2e.local`.

### E2E Safety Rules

- Run E2E tests only against staging or localhost.
- Do not run E2E tests against production.
- Do not commit Playwright auth state.
- Do not commit Playwright screenshots, videos, traces, or reports.
- Keep workers low to avoid abusing free staging services.
- Avoid image upload tests unless Cloudinary usage and cleanup are controlled.
- Avoid email inbox automation while `EMAIL_DELIVERY_MODE="log"`.
- Use dedicated test customer/admin accounts.
- Use products with enough stock for order tests.

### Playwright Auth State

The E2E suite saves logged-in customer/admin sessions under:

```txt
tests/e2e/.auth/
```

If login state becomes stale, delete that folder and rerun:

```bash
rm -rf tests/e2e/.auth
npm run test:e2e
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force tests/e2e/.auth
npm run test:e2e
```

### Current E2E Coverage

Current Playwright coverage includes:

- public homepage/products smoke tests
- customer login
- customer cart add/cleanup
- customer authenticated pages
- controlled customer order creation
- guest auth guard behavior
- admin read-only pages
- admin orders read-only API/page behavior

## Staging Notes

The staging environment may use free plans while testing, such as Render free web service, Neon free Postgres, Upstash free Redis, Cloudinary free plan, and `EMAIL_DELIVERY_MODE="log"`.

Free services are for staging/testing only. Avoid heavy traffic, stress tests, or behavior that could violate provider limits.

Production should use paid/reliable hosting, paid or production-ready database backups, real SMTP configuration, and production secrets separate from staging.

## Production Deployment Flow

Before deploying:

```bash
npm ci
npm run check
npm run build
```

Apply production migrations during deployment:

```bash
npm run db:migrate:deploy
```

Start the app:

```bash
npm run start
```

Depending on the hosting provider, migrations may run as a release command, deploy hook, or CI/CD step.

Important production rules:

- Do not manually edit the production database schema.
- Do not run `prisma migrate dev` in production.
- Do not run `prisma db push` in production.
- Always commit Prisma migration files.
- Back up the production database before the first real launch and before risky schema changes.

## Production Deployment Checklist

### Environment

- [ ] Production `.env` values are configured only in the hosting provider.
- [ ] `.env` is not committed.
- [ ] `DATABASE_URL` points to the production database.
- [ ] `BETTER_AUTH_SECRET` is long, random, and private.
- [ ] `BETTER_AUTH_URL` uses the real `https://` production domain.
- [ ] `APP_URL` uses the real `https://` production domain.
- [ ] SMTP credentials are production-ready.
- [ ] Upstash Redis variables are configured.
- [ ] Cloudinary variables are configured.
- [ ] No secret is exposed through a `NEXT_PUBLIC_` variable.

### Database

- [ ] All Prisma migrations are committed.
- [ ] Production uses `npm run db:migrate:deploy`.
- [ ] Production does not use `prisma db push`.
- [ ] Production does not use `prisma migrate dev`.
- [ ] A database backup plan exists.
- [ ] A rollback plan exists.

### Security

- [ ] Admin pages are protected server-side.
- [ ] Admin APIs check the `ADMIN` role server-side.
- [ ] Customer APIs check the logged-in user's ID server-side.
- [ ] Cart and order APIs are scoped to the authenticated user.
- [ ] CSRF / same-origin checks protect protected mutation routes.
- [ ] Rate limiting works in production with Upstash Redis.
- [ ] Security headers are active on the deployed app.
- [ ] API responses do not expose password hashes.
- [ ] API responses do not expose tokens or secrets.
- [ ] API responses do not expose raw stack traces or raw database errors.
- [ ] Login, registration, password reset, and public APIs are rate limited.

### Application Testing

- [ ] Register works on the deployed domain.
- [ ] Login works on the deployed domain.
- [ ] Logout works on the deployed domain.
- [ ] Password reset emails work.
- [ ] Email verification flow works, if enabled.
- [ ] Public product listing works.
- [ ] Public product details work.
- [ ] Cart actions work while logged in.
- [ ] Checkout creates an order once.
- [ ] Duplicate checkout protection works.
- [ ] Customer orders page only shows the current user's orders.
- [ ] Admin products page works for admins.
- [ ] Admin upload works for admins.
- [ ] Admin orders page works for admins.
- [ ] Non-admin users cannot access admin APIs.
- [ ] Signed-out users cannot access protected APIs.

### Testing

- [ ] Unit tests pass with `npm run test:run`.
- [ ] TypeScript passes with `npm run typecheck`.
- [ ] ESLint passes with `npm run lint`.
- [ ] Production build passes with `npm run build`.
- [ ] Manual customer flow is tested on staging.
- [ ] Manual admin flow is tested on staging.
- [ ] Playwright E2E tests pass with `npm run test:e2e`.
- [ ] Playwright auth state and test artifacts are not committed.
- [ ] Any future load/smoke test is small, staging-safe, and reviewed for licensing/tooling risk before use.

### Repository

- [ ] `.env` files are ignored.
- [ ] `.env.example` is safe to commit.
- [ ] Generated Prisma files are not committed.
- [ ] `node_modules` is not committed.
- [ ] `.next` is not committed.
- [ ] README is up to date.
- [ ] Release tag exists for the deployed version.
- [ ] Dependency licenses are reviewed before commercial delivery.

## Release Versioning

Use Git tags for deployed releases.

Recommended version format:

```txt
v0.1.0  internal hardening release
v0.2.0  staging/client review release
v1.0.0  first production launch
v1.0.1  production bug fix
v1.1.0  small feature release
v2.0.0  major or breaking release
```

Create a release tag only after checks pass:

```bash
npm run check
npm run build
git status
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

Tag the exact commit that is deployed.

For production releases, prefer this flow:

```txt
feature branch -> pull request -> main -> deployment -> version tag
```

## Branch Workflow

Use feature branches for changes:

```bash
git switch main
git pull origin main
git switch -c feature-name
```

After changes are tested:

```bash
npm run check
npm run build
git status
git add .
git commit -m "clear commit message"
git push -u origin feature-name
```

Open a pull request, review the changes, then merge into `main`.

Do not make production changes directly on `main` unless it is an emergency hotfix.

## Authentication and Authorization

Authentication answers:

```txt
Who is the user?
```

Authorization answers:

```txt
What is this user allowed to do?
```

This project must check both.

Examples:

- A signed-in customer can access their own cart.
- A signed-in customer must not access another customer's cart or orders.
- A signed-in customer must not access admin APIs.
- An admin can access admin APIs.
- Hiding admin buttons in the frontend is not enough.

Protected server routes and API routes must always check authorization server-side.

## File and Secret Safety

Do not commit:

```txt
.env
.env.local
.env.production
.env.staging
.env.backup
.env.e2e.local
node_modules/
.next/
generated/
tests/e2e/.auth/
test-results/
playwright-report/
blob-report/
```

Safe to commit:

```txt
.env.example
prisma/schema.prisma
prisma/migrations/
src/
public/
README.md
package.json
package-lock.json
```

## Email Delivery Notes

For local development and staging, use:

```env
EMAIL_DELIVERY_MODE="log"
```

This prevents real emails from being sent while still allowing the app to test email flows safely.

For production, configure a real SMTP provider and use:

```env
EMAIL_DELIVERY_MODE="smtp"
```

Do not use personal Gmail SMTP for production client email. Use a real transactional email provider and verify the sending domain.

## Legal and Licensing Notes

Before commercial delivery:

- Review dependency licenses.
- Review image/icon/font licenses.
- Do not use paid templates, copied UI kits, or proprietary assets without permission.
- Do not commit licensed assets unless the client has the right to use them.
- Keep proof of license or permission for commercial assets.

## Project Notes

This app is still being hardened for production. Before launch, complete the production deployment checklist and test the full customer and admin flows on the deployed domain.
