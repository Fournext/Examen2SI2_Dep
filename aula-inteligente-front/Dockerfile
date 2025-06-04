# Etapa de build
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

# Etapa de producción
FROM nginx:alpine

# Copiar el build generado al contenedor de nginx
COPY --from=builder /app/dist/aula-inteligente-front/browser /usr/share/nginx/html

# Copiar configuración personalizada de nginx si tienes una (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf
