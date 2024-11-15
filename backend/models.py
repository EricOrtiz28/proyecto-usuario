# backend/models.py
from sqlalchemy import Column, Integer, String, Date
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    apellido_paterno = Column(String, index=True)
    apellido_materno = Column(String, index=True)
    nombres = Column(String, index=True)
    dni = Column(String, unique=True, index=True)
    celular = Column(String)
    fecha_nacimiento = Column(Date)
    estado_civil = Column(String)  # Añadido o asegurado que existe
    ocupacion = Column(String)     # Añadido o asegurado que existe
