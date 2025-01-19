FROM node:20-slim

WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies as root
RUN npm install -g nodemon && npm install

# Copy application code
COPY . .

# Change ownership of all files to node user
RUN chown -R node:node /usr/src/app

# Switch to node user after installations
USER node

# Set environment variables
ENV DEBUG=playground:*
ENV NODE_ENV=development
ENV PORT=4000

# Expose the port
EXPOSE 4000

# Start the development server
CMD ["npm", "run", "dev"]