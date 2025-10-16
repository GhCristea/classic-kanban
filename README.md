# With-Drizzle

A SvelteKit starter with end-to-end type safety, featuring Drizzle ORM, Auth.js, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Clone and install
git clone <your-repo>
pnpm install

cp .env.example .env
# Add your DATABASE_URL, AUTH_SECRET, and GitHub OAuth credentials

pnpm run db:push
# pnpm run db:seed
    
# Start development
pnpm run dev
```

## Stack

- **SvelteKit** - File-based routing, SSR, and seamless hydration
- **Drizzle ORM** - Type-safe database schema with migrations
- **Auth.js** - GitHub OAuth with secure sessions
- **Tailwind CSS** - Utility-first styling with forms plugin

## 📁 Project Structure
```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── server/
│   │   ├── auth/       # Auth.js configuration
│   │   └── db/         # Drizzle schema and validators
│   └── types/          # Shared TypeScript types
├── routes/
│   ├── auth/           # Sign-in/out pages
│   ├── board/          # Kanban board
│   ├── projects/       # Project management
│   └── task/           # Task deta
```
- `DATABASE_URL` - PostgreSQL connection
- `AUTH_SECRET` - Session encryption key
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - OAuth credentials

**Database Workflow:**
1. Edit schema in `src/lib/server/db/schema/`
2. Run `pnpm run db:generate` to create migration
3. Run `pnpm run db:push` to apply changes
4. Use `pnpm run db:studio` to explore data

## 📄 License

MIT License