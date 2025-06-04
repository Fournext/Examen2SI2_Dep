#!/bin/sh

# Esperar a que el contenedor de Postgres esté disponible
echo "⏳ Esperando a que Postgres esté disponible en $POSTGRES_HOST:5432..."
until nc -z "$POSTGRES_HOST" 5432; do
  sleep 1
done

echo "✅ Postgres está arriba. Continuando..."

# Aplicar migraciones
echo "🛠️ Ejecutando makemigrations y migrate..."
python manage.py makemigrations
python manage.py migrate

# Poblar datos iniciales si existe el archivo
if [ -f "poblar_datos.py" ]; then
  echo "📥 Poblando datos iniciales desde poblar_datos.py..."
  python manage.py shell -c "exec(open('poblar_datos.py').read())"
fi

# Iniciar el servidor
echo "🚀 Iniciando servidor Django en 0.0.0.0:8000"
python manage.py runserver 0.0.0.0:8000
