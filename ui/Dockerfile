FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Run the dev server with host 0.0.0.0 to allow access from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

