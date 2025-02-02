import axios from "axios";

// Criando uma instância do Axios para configurar as requisições com o token
const api = axios.create({
    baseURL: "http://localhost:3001", // URL base da API
});

// Interceptador para adicionar o token no cabeçalho das requisições
api.interceptors.request.use(
    (config) => {
        // Obtendo o token armazenado no localStorage
        const token = localStorage.getItem("authToken");

        if (token) {
            // Adiciona o token no cabeçalho Authorization
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
