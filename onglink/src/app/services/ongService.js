import api from './api';

const ongService = {
    listarOng: async () => (await api.get('/ongs')).data,
    buscarOngPorId: async (id) => (await api.get(`/ongs/${id}`)).data,
    cadastrarOng: async (data) => (await api.post('/ongs',data)).data,
    atualizarOng: async(id,data) => (await api.put(`/ongs/${id}`,data)).data,
    deletarOng: async(id) => (await api.delete(`/ongs/${id}`)).data,
    listarAprovacoes: async () => (await api.get('/aprovacao')).data,
};
export default ongService;