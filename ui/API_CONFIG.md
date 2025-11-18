# API Configuration

This frontend connects to your Go backend API running on `http://localhost:4000/v1`.

## Backend Setup

Make sure your Go API server is running:

```bash
go run ./cmd/api
```

The API should be accessible at:
- Base URL: `http://localhost:4000/v1`
- Health Check: `http://localhost:4000/v1/healthcheck`

## API Endpoints Used

### Exercises
- `GET /v1/exercises` - List exercises with filtering
- `GET /v1/exercises/:id` - Get single exercise

### Muscles
- `GET /v1/muscles` - List muscles with filtering
- `GET /v1/muscles/:id` - Get single muscle

### Movement Patterns
- `GET /v1/movement-patterns` - List movement patterns
- `GET /v1/movement-patterns/:id` - Get single pattern

## Query Parameters

### Exercises
- `name` - Search by name
- `type` - Filter by type (compound/isolation)
- `body_part` - Filter by body part
- `muscle_id` - Filter by muscle
- `movement_pattern` - Filter by pattern name
- `page` - Pagination
- `page_size` - Results per page

### Muscles
- `body_part` - Filter by body part
- `page` - Pagination
- `page_size` - Results per page

### Movement Patterns
- `name` - Search by name
- `page` - Pagination
- `page_size` - Results per page

## CORS Configuration

If you encounter CORS issues, ensure your Go backend allows requests from the frontend origin.

Add to your Go middleware:

```go
w.Header().Set("Access-Control-Allow-Origin", "*")
w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
```
