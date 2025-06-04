# Imagen base
FROM python:3.12

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Crea directorio de trabajo
WORKDIR /app

# Copiar requirements e instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el proyecto
COPY . .

# Copiar el script de espera
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

# Exponer el puerto del servidor Django
EXPOSE 8000

# Ejecutar script que espera a que Postgres esté listo y lanza el servidor
CMD ["/wait-for-postgres.sh"]
