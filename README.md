# Loot Corner

Loot Corner is a full-stack e-commerce web application for selling collectible products such as figures, posters, and accessories.

## Tech Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Auth.js
- Zod
- Docker

## Backend Foundation

The backend foundation is implemented using Next.js, Prisma, PostgreSQL, Auth.js, and Zod.

### Completed Features

- PostgreSQL database setup with Docker
- Prisma schema with core models:
  - User
  - Category
  - Product
  - Order
  - OrderItem
  - Message
- Prisma migrations applied successfully
- Prisma Client generated and used for database access
- Auth.js credentials authentication
- Password hashing with bcrypt
- JWT-based session strategy
- Protected account and admin routes using middleware
- Admin-only page protection
- Admin API role checks
- Non-admin users receive `404` for admin-only pages/routes
- Zod validation for register, login, category, and product input
- Field-level validation errors returned from API routes
- Basic security checks completed:
  - No plaintext passwords stored
  - `passwordHash` is not returned from API routes
  - Secrets are stored in `.env`
  - Prisma is used instead of raw SQL
  - Auth sessions use HTTP-only cookies

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5436/DB_NAME"
AUTH_SECRET="replace-with-your-auth-secret"
```

Generate an Auth.js secret:

npx auth secret
Development

Install dependencies:

npm install

Run the development server:

npm run dev

Run Prisma commands:

npx prisma migrate dev
npx prisma generate
npx prisma studio

Run checks:

npm run lint
npm run build
Roles

The system currently supports two roles:

CUSTOMER
ADMIN

Admin-only pages and API routes verify the user session role before allowing access.

After editing README:

```bash
git add README.md
git commit -m "Update README with backend foundation details"
git push origin main
```
