# Use Node.js 20 as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY . .

# Install dependencies and build the project
RUN npm install
# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["sh", "-c", "npm run build && npm run start"]