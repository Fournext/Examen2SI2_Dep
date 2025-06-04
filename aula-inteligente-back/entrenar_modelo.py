# entrenar_modelo.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

# Leer los datos del CSV
df = pd.read_csv("datos_boletin.csv")

# Preprocesar datos
df["estado"] = df["estado"].map({"aprobado": 1, "reprobado": 0})
df["trimestre_nro"] = df["trimestre"].str.extract(r'(\d+)').astype(int)

# Ordenar por estudiante, materia y trimestre
df = df.sort_values(by=["id_estudiante", "materia", "trimestre_nro"])

# Crear dataset secuencial: usar 3 trimestres anteriores para predecir el 4to
secuencias = []
for (est, mat), grupo in df.groupby(["id_estudiante", "materia"]):
    if len(grupo) >= 4:
        grupo = grupo.reset_index(drop=True)
        for i in range(len(grupo) - 3):
            datos_previos = grupo.iloc[i:i+3][["ser", "saber", "hacer", "decidir", "promedio"]].values.flatten()
            objetivo = grupo.iloc[i+3]["promedio"]
            secuencias.append(datos_previos.tolist() + [objetivo])

# Convertir a DataFrame
columnas = [f"{cat}_t{i+1}" for i in range(3) for cat in ["ser", "saber", "hacer", "decidir", "promedio"]]
columnas += ["promedio_objetivo"]
df_final = pd.DataFrame(secuencias, columns=columnas)

# Separar X e y
X = df_final.drop(columns=["promedio_objetivo"])
y = df_final["promedio_objetivo"]

# Entrenar modelo
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
modelo = RandomForestRegressor(n_estimators=100, random_state=42)
modelo.fit(X_train, y_train)

# Guardar modelo
joblib.dump(modelo, "modelo_boletin.pkl")
print("✅ Modelo entrenado y guardado como modelo_boletin.pkl")
