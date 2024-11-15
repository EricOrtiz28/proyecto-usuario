// frontend/src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:8000";  // URL del backend

export const registrarUsuario = async (usuario) => {
    return await axios.post(`${API_URL}/usuarios/`, usuario);
};
