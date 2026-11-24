# # stage 1
# # Build stage
# FROM node:20-alpine AS builder
# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm ci --silent

# # Copy source and build
# COPY . .
# RUN npm run build


# #stage 2
# # Production stage
# FROM nginx:stable-alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .

# Build and serve with vite preview (production-like)
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
