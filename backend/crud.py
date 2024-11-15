# backend/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def crear_usuario(db: Session, usuario: schemas.UsuarioCreate):
    db_usuario = models.Usuario(
        apellido_paterno=usuario.apellido_paterno,
        apellido_materno=usuario.apellido_materno,
        nombres=usuario.nombres,
        dni=usuario.dni,
        celular=usuario.celular,
        fecha_nacimiento=usuario.fecha_nacimiento,
        estado_civil=usuario.estado_civil,  # Incluido en la creación
        ocupacion=usuario.ocupacion         # Incluido en la creación
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario
