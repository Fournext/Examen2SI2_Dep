FROM python:3.12

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py shell -c \"exec(open('poblar_datos.py').read())\" && python manage.py runserver 0.0.0.0:8000"]
