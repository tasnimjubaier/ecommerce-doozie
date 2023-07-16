# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Build the React application
RUN npm run build

# Specify the command to run the application
CMD ["npm", "start"]
