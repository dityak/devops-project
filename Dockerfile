# Use official Node.js base image
FROM node:18-slim


# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app code
COPY . .

# Expose port if your app listens on one (change if needed)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]

