#!/bin/bash

echo "🚀 Starting ExerciseLib Application..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Build and start services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ Services are running!"
    echo ""
    echo "🌐 Access your application at:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend API: http://localhost:4000"
    echo "   Health Check: http://localhost:4000/v1/healthcheck"
    echo ""
    echo "📊 View logs with: docker-compose logs -f"
    echo "🛑 Stop services with: docker-compose down"
    echo ""
else
    echo ""
    echo "❌ Some services failed to start. Check logs with:"
    echo "   docker-compose logs"
    exit 1
fi

