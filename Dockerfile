# Use official Node.js Alpine base image for security and size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your app code (excluding .dockerignore files)
COPY . .

# Expose port if your app listens on one
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]