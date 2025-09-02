# AVNERA Website

## Online database (PostgreSQL)

1. Create a PostgreSQL database (Neon, Supabase, Render, Railway, etc.).
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Swap Prisma schema to Postgres (two options):
   - Easiest: replace `datasource db` in `prisma/schema.prisma` with:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - Or use the provided `prisma/schema.postgres.prisma` as your schema and rename it to `schema.prisma`.
4. Generate client and push schema:
   ```bash
   npm run prisma:generate
   npx prisma db push
   ```
   Or for migrations in production:
   ```bash
   npx prisma migrate dev -n init
   npm run prisma:deploy
   ```
5. Start the app and confirm pages load with remote DB.

### Notes


### Auth

- Set `ADMIN_PASSWORD` to enable admin login at `/admin/login`.
- Optionally set `AUTH_SECRET` to sign user sessions; otherwise `ADMIN_PASSWORD` is used.
- User flows available at `/auth/signup` and `/auth/login`. Admin pages require role ADMIN or the admin cookie.
