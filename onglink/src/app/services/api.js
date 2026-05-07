import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api` || 'http://localhost:4000',
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  }
});
api.interceptors.request.use(
    (config) => {
        
        // 'authToken' deve ser a mesma chave que você usou no login!
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

        // Se tiver token, adiciona no cabeçalho Authorization
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
