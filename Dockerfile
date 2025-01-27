# Stage 1: Build Stage
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) into the container
COPY package*.json ./

# Install application dependencies
RUN npm install -f

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:18 AS production

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and build directory into the production image
COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./build

# Install only production dependencies
RUN npm install --only=production

# Specify the command to run your application (if applicable)
# CMD ["npm", "start"]

# Expose the port the app runs on (if applicable)
EXPOSE 3000
