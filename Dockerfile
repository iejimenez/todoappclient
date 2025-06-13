# Stage 1: Build the Angular application
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build -- --configuration production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Create necessary directories and set permissions
RUN mkdir -p /tmp/nginx && \
    chmod 777 /tmp/nginx && \
    mkdir -p /var/cache/nginx && \
    chmod 777 /var/cache/nginx

# Copy the built application from the build stage
COPY --from=build /app/dist/todo-app /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 