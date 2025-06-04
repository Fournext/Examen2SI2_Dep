# Fase de construcción
FROM node:18 AS builder
WORKDIR /app

# Copiar dependencias
COPY package.json package-lock.json ./

# Aumentar configuración de red para evitar timeouts
RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm config set timeout 600000 \
  && npm ci

# Copiar el resto de archivos
COPY . .

# Build de producción Angular
RUN npm run build -- --configuration=production

# Fase de producción (más ligera, sin devDependencies)
FROM node:18-slim
WORKDIR /app

# Copiar dependencias necesarias
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copiar la salida del build
COPY --from=builder /app/dist/my-project/browser ./browser
COPY --from=builder /app/dist/my-project/server ./server

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

CMD ["node", "server/server.mjs"]
