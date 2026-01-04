# --- Stage 1: Build the React application ---
FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: Serve the application with Nginx ---
FROM nginx:alpine
# Copy the built files from the 'build' stage to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 for web traffic
EXPOSE 80
# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
