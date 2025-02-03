# services/api-gateway/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install @nestjs/config --legacy-peer-deps
RUN npm install @nestjs/passport passport passport-jwt @nestjs/jwt --force or --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
