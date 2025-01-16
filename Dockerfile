# Base image
FROM node:23-alpine AS base

# Install SQLite
RUN apk add --no-cache sqlite

# Set working directory inside container
WORKDIR /app

# Create database folder and initialize SQLite
RUN mkdir -p /app/db
RUN sqlite3 /app/db/database.db "VACUUM;"

# Copy package files to install dependencies
COPY ./yarn.lock ./package.json ./

# Install dependencies with Yarn
RUN yarn install

# Copy Prisma schema for migrations
COPY ./prisma ./prisma/

# Set DATABASE_URL for Prisma
ENV DATABASE_URL=file:/app/db/database.db

# Run Prisma migration to initialize DB
RUN npx prisma migrate dev --name init

# Copy the rest of the app files
COPY ./ ./

# Final app image
FROM node:23-alpine

WORKDIR /app

# Copy app files from base image
COPY --from=base ./app ./

ENV DATABASE_URL=file:/app/db/database.db

# Run the app in development mode
CMD ["yarn", "dev"]
