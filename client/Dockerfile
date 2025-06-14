# client/Dockerfile
FROM node:18-alpine
WORKDIR /app

# 1. Install dependencies
COPY package*.json ./
RUN npm ci

# 2. Copy source & build
COPY . .
RUN npm run build

# 3. Expose port and start Next.js
EXPOSE 3000
CMD ["npm", "run", "start"]
