FROM node:20-alpine AS builder
WORKDIR /app/client
# Путь относительно корня проекта (так как контекст в compose - это .)
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ ./
RUN npm run build

# ЭТАП 2: Запуск сервера
FROM node:20-alpine
WORKDIR /app/server
# Путь относительно корня проекта
COPY ./server/package*.json ./
RUN npm install

# Копируем всё содержимое папки server
COPY ./server/ ./

# Копируем результат сборки из первого этапа
# Внутри первого этапа мы были в /app/client/dist
COPY --from=builder /app/client/dist ./dist

EXPOSE 3005
CMD ["node", "index.js"]