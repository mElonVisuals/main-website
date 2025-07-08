# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one) to the working directory
# This step is done separately to leverage Docker's layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Expose the port your app will run on. This should match the 'port' variable in index.js.
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]