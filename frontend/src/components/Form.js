// src/components/Form.js
import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function Form() {
    const initialFormState = {
        apellido_paterno: "",
        apellido_materno: "",
        nombres: "",
        dni: "",
        celular: "",
        fecha_nacimiento: "",
        estado_civil: "Soltero",
        ocupacion: "Estudio"
    };

    const [usuario, setUsuario] = useState(initialFormState);
    const [usuarioGuardado, setUsuarioGuardado] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!usuario.apellido_paterno) newErrors.apellido_paterno = "Campo requerido";
        if (!usuario.apellido_materno) newErrors.apellido_materno = "Campo requerido";
        if (!usuario.nombres) newErrors.nombres = "Campo requerido";
        if (!usuario.dni || usuario.dni.length !== 8) newErrors.dni = "DNI inválido";
        if (!usuario.celular || usuario.celular.length < 9) newErrors.celular = "Celular inválido";
        if (!usuario.fecha_nacimiento) newErrors.fecha_nacimiento = "Campo requerido";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:8000/usuarios/", usuario);
                alert("Usuario registrado correctamente");
                setUsuarioGuardado(response.data);
                setUsuario(initialFormState);
            } catch (error) {
                console.error("Error al registrar usuario:", error);
            }
        }
    };

    const formatMessage = () => {
        if (!usuarioGuardado) return "";

        const { apellido_paterno, apellido_materno, nombres, celular, estado_civil, ocupacion } = usuarioGuardado;
        const edad = new Date().getFullYear() - new Date(usuarioGuardado.fecha_nacimiento).getFullYear();

        // Genera la frase principal con los detalles del usuario
        let mensaje = `Mi nombre es ${apellido_paterno} ${apellido_materno} ${nombres} y tengo ${edad} años, me pueden contactar al ${celular} y actualmente estoy ${estado_civil.toLowerCase()}.`;
        
        // Añade la ocupación específica como "estudiante" o "trabajador"
        if (ocupacion === "Estudio") {
            mensaje += ` Además, soy estudiante.`;
        } else if (ocupacion === "Trabajo") {
            mensaje += ` Además, soy trabajador.`;
        }

        return mensaje;
    };

    return (
        <div className="container">
            <div className="left-column">
                <h1 className="title">Registro de Usuario</h1>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        name="apellido_paterno"
                        placeholder="Apellido Paterno"
                        value={usuario.apellido_paterno}
                        onChange={handleChange}
                    />
                    {errors.apellido_paterno && <p className="error">{errors.apellido_paterno}</p>}

                    <input
                        type="text"
                        name="apellido_materno"
                        placeholder="Apellido Materno"
                        value={usuario.apellido_materno}
                        onChange={handleChange}
                    />
                    {errors.apellido_materno && <p className="error">{errors.apellido_materno}</p>}

                    <input
                        type="text"
                        name="nombres"
                        placeholder="Nombres"
                        value={usuario.nombres}
                        onChange={handleChange}
                    />
                    {errors.nombres && <p className="error">{errors.nombres}</p>}

                    <input
                        type="text"
                        name="dni"
                        placeholder="DNI"
                        value={usuario.dni}
                        onChange={handleChange}
                    />
                    {errors.dni && <p className="error">{errors.dni}</p>}

                    <input
                        type="text"
                        name="celular"
                        placeholder="Número de Celular"
                        value={usuario.celular}
                        onChange={handleChange}
                    />
                    {errors.celular && <p className="error">{errors.celular}</p>}

                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={usuario.fecha_nacimiento}
                        onChange={handleChange}
                    />
                    {errors.fecha_nacimiento && <p className="error">{errors.fecha_nacimiento}</p>}

                    <select
                        name="estado_civil"
                        value={usuario.estado_civil}
                        onChange={handleChange}
                        className="select"
                    >
                        <option value="Soltero">Soltero</option>
                        <option value="Casado">Casado</option>
                        <option value="Divorciado">Divorciado</option>
                        <option value="Viudo">Viudo</option>
                    </select>

                    <select
                        name="ocupacion"
                        value={usuario.ocupacion}
                        onChange={handleChange}
                        className="select"
                    >
                        <option value="Estudio">Estudio</option>
                        <option value="Trabajo">Trabajo</option>
                    </select>

                    <button type="submit">Guardar</button>
                </form>
            </div>
            <div className="right-column">
                {usuarioGuardado ? (
                    <div className="user-info">
                        <img
                            src="https://st5.depositphotos.com/18273866/65700/i/450/depositphotos_657000744-stock-photo-one-man-young-adult-caucasian.jpg"
                            alt="Avatar"
                            className="user-avatar"
                        />
                        <h2>Usuario Guardado</h2>
                        <p><strong>Apellidos:</strong> {usuarioGuardado.apellido_paterno} {usuarioGuardado.apellido_materno}</p>
                        <p><strong>Nombre:</strong> {usuarioGuardado.nombres}</p>
                        <p><strong>DNI:</strong> {usuarioGuardado.dni}</p>
                        <p><strong>Celular:</strong> {usuarioGuardado.celular}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {usuarioGuardado.fecha_nacimiento}</p>
                        <p><strong>Estado Civil:</strong> {usuarioGuardado.estado_civil}</p>
                        <p><strong>Ocupación:</strong> {usuarioGuardado.ocupacion}</p>
                        <p className="formatted-message">{formatMessage()}</p>
                    </div>
                ) : (
                    <p className="placeholder">Ingresa un usuario para ver los detalles aquí.</p>
                )}
            </div>
        </div>
    );
}

export default Form;
