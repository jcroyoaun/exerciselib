#!/bin/bash

echo "🗑️  Stopping containers and removing volumes..."
docker-compose down -v

echo ""
echo "✅ Database volume removed!"
echo ""
echo "🚀 Starting fresh with database initialization..."
docker-compose up --build

