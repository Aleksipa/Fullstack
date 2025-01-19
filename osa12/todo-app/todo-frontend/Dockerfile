# Test stage first
FROM node:20 AS test-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm test

# Build stage - uses tested code from test stage
FROM node:20 AS build-stage 
WORKDIR /usr/src/app
# Copy tested code from test stage instead of directly from host
COPY --from=test-stage /usr/src/app .
RUN npm ci
RUN npm run build

# Production stage
FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html