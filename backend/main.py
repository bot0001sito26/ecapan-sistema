from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# import oracledb  <- Comentado, ahora se maneja en database.py
import asyncio
from typing import List

# Importar la función de conexión desde nuestro nuevo archivo
from database import get_db_connection

app = FastAPI()

# Habilitar CORS para que React (puerto 5173) pueda consumir la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# CONFIGURACIÓN LOCAL ANTIGUA (Comentada por migración a la nube)
# ==========================================================
# DB_USER = "SYSTEM"
# DB_PASSWORD = "oracle123"
# DB_DSN = "localhost:1521/XEPDB1"
# def get_db_connection():
#     return oracledb.connect(user=DB_USER, password=DB_PASSWORD, dsn=DB_DSN)
# ==========================================================

# Modelos de datos esperados


class Consulta(BaseModel):
    cedula: str


class Pago(BaseModel):
    cedula: str
    monto: float
    tarjeta_oculta: str


@app.post("/api/consultar-deuda")
def consultar_deuda(consulta: Consulta):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                sql = """
                    SELECT p.id_planilla, p.mes, p.total, u.nombres || ' ' || u.apellidos as cliente, m.id_medidor, m.direccion
                    FROM PLANILLAS p
                    JOIN MEDIDORES m ON p.id_medidor = m.id_medidor
                    JOIN USUARIOS u ON m.id_usuario = u.id_usuario
                    WHERE u.cedula = :cedula AND p.estado = 'PENDIENTE'
                    ORDER BY m.id_medidor, p.id_planilla ASC
                """
                cursor.execute(sql, [consulta.cedula])
                filas = cursor.fetchall()

                if not filas:
                    return {"mensaje": "No se encontraron planillas pendientes.", "planillas": [], "total_adeudado": 0}

                cliente = filas[0][3]
                medidores_dict = {}
                total = 0

                for fila in filas:
                    id_planilla, mes, monto, _, id_medidor, direccion = fila

                    if id_medidor not in medidores_dict:
                        medidores_dict[id_medidor] = {
                            "id_medidor": id_medidor,
                            "direccion": direccion,
                            "planillas": []
                        }

                    medidores_dict[id_medidor]["planillas"].append({
                        "id_planilla": id_planilla,
                        "mes": mes,
                        "monto": monto
                    })
                    total += monto

                return {
                    "cliente": cliente,
                    "medidores": list(medidores_dict.values()),
                    "total_adeudado": round(total, 2)
                }
    except Exception as e:
        # Esto saldrá en los logs de Render
        print(f"ERROR CRITICO EN ORACLE: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


class PagoParcial(BaseModel):
    cedula: str
    ids_planillas: List[int]
    monto: float
    tarjeta_oculta: str


@app.post("/api/procesar-pago")
async def procesar_pago(pago: PagoParcial):
    if not pago.ids_planillas:
        raise HTTPException(
            status_code=400, detail="Debe seleccionar al menos una planilla.")

    await asyncio.sleep(2.5)  # Simulación de pasarela

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                bind_names = [f":id{i}" for i in range(
                    len(pago.ids_planillas))]
                sql_update = f"""
                    UPDATE PLANILLAS 
                    SET estado = 'PAGADA', fecha_pago = SYSDATE
                    WHERE id_planilla IN ({','.join(bind_names)})
                """
                params = {f"id{i}": val for i,
                          val in enumerate(pago.ids_planillas)}
                cursor.execute(sql_update, params)
                conn.commit()

                return {
                    "status": "aprobado",
                    "mensaje": "Transacción exitosa",
                    "codigo_autorizacion": "ECAPAN-99823",
                    "monto_cobrado": pago.monto
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
