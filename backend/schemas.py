# backend/schemas.py
from pydantic import BaseModel
from datetime import date

class UsuarioBase(BaseModel):
    apellido_paterno: str
    apellido_materno: str
    nombres: str
    dni: str
    celular: str
    fecha_nacimiento: date
    estado_civil: str  # Asegúrate de que este campo esté definido
    ocupacion: str     # Asegúrate de que este campo esté definido

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int

    class Config:
        orm_mode = True
