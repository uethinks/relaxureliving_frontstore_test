# # Use Node.js 20 as the base image
# FROM node:20

# # Set the working directory
# WORKDIR /app

# # Copy the project files into the container
# COPY . .

# # Install dependencies and build the project
# RUN npm install
# # Expose the port the app runs on
# EXPOSE 8000

# # Start the application
# CMD ["sh", "-c", "npm run build && npm run start"]


# Stage 1: Dependency Installation
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN   npm install --frozen-lockfile

# Stage 2: Build Application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
 

EXPOSE 8000
CMD ["sh", "-c", "npm run build && npm run start"]
# CMD ["sh", "-c", "npm run dev2"]