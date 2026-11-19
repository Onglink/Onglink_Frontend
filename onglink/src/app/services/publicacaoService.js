import api from './api';
//import axios from 'axios';

const publicacaoSevice = {
    listarPublicacao: async (page = 1, limit = 10) => {
        const { data } = await api.get('/publicacoes', {
            params: { page, limit },
        });

        if (Array.isArray(data)) {
            return { publicacoes: data, hasMore: false, nextPage: null };
        }

        return {
            publicacoes: data.publicacoes ?? [],
            hasMore: Boolean(data.hasMore),
            nextPage: data.nextPage ?? null,
        };
    },
    buscarPublicacao: async (id) => (await api.get(`/publicacoes/${id}`)).data,
    cadastrarPublicacao: async (formData) => (await api.post('/publicacoes', formData)).data,
    atualizarPublicacao: async (id, data) => (await api.put(`/publicacoes/${id}`, data)).data,
    deletarPublicacao: async (id) => (await api.delete(`/publicacoes/${id}`)).data,
};

export default publicacaoSevice;