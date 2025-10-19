#!/bin/bash
set -e

echo "🚀 Setting up workspace..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ Error: pnpm is not installed. Please install pnpm first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies with pnpm..."
pnpm install

# Copy environment variables from root
echo "🔐 Copying environment variables..."
if [ -f "$CONDUCTOR_ROOT_PATH/.env" ]; then
    cp "$CONDUCTOR_ROOT_PATH/.env" .env
    echo "✅ Environment variables copied from root"
else
    echo "⚠️  Warning: No .env file found in root. Checking .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "⚠️  Created .env from .env.example - please configure it with actual values"
    else
        echo "❌ Error: No .env or .env.example file found"
        exit 1
    fi
fi

# Validate required environment variables
source .env
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL is not set in .env"
    exit 1
fi

if [ -z "$AUTH_SECRET" ]; then
    echo "❌ Error: AUTH_SECRET is not set in .env"
    exit 1
fi

# Run database migrations
echo "🗄️  Running database migrations..."
pnpm db:push

# Run SvelteKit sync
echo "🔄 Running SvelteKit sync..."
pnpm prepare

echo "✅ Workspace setup complete! Run 'pnpm dev' to start the development server."
