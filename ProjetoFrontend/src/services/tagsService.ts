// frontend/src/services/tagService.ts
import api from './api';
import type { Tag, CriarTagDTO, AtualizarTagDTO, TagResponse } from '../types/tags';

class TagService {
    // Listar todas as tags do usuário
    async listarTags(page: number = 1, limit: number = 50, buscar?: string): Promise<TagResponse> {
        try {
            let url = `/tags?page=${page}&limit=${limit}`;
            if (buscar) {
                url += `&buscar=${buscar}`;
            }
            const response = await api.get<TagResponse>(url);
            return response.data;
        } catch (error: any) {
            console.error('Erro ao listar tags:', error);
            throw error.response?.data || { erro: 'Erro ao listar tags' };
        }
    }

    // Criar nova tag
    async criarTag(dados: CriarTagDTO): Promise<Tag> {
        try {
            const response = await api.post<{ mensagem: string; tag: Tag }>('/tags', dados);
            return response.data.tag;
        } catch (error: any) {
            console.error('Erro ao criar tag:', error);
            throw error.response?.data || { erro: 'Erro ao criar tag' };
        }
    }

    // Atualizar tag
    async atualizarTag(id: number, dados: AtualizarTagDTO): Promise<Tag> {
        try {
            const response = await api.put<{ mensagem: string; tag: Tag }>(`/tags/${id}`, dados);
            return response.data.tag;
        } catch (error: any) {
            console.error('Erro ao atualizar tag:', error);
            throw error.response?.data || { erro: 'Erro ao atualizar tag' };
        }
    }

    // Deletar tag
    async deletarTag(id: number): Promise<void> {
        try {
            await api.delete(`/tags/${id}`);
        } catch (error: any) {
            console.error('Erro ao deletar tag:', error);
            throw error.response?.data || { erro: 'Erro ao deletar tag' };
        }
    }

    // Vincular tag à leitura
    async vincularTag(id_tag: number, id_leitura: number): Promise<void> {
        try {
            await api.post(`/tags/${id_tag}/leituras/${id_leitura}`);
        } catch (error: any) {
            console.error('Erro ao vincular tag:', error);
            throw error.response?.data || { erro: 'Erro ao vincular tag' };
        }
    }

    // Remover tag da leitura
    async removerTag(id_tag: number, id_leitura: number): Promise<void> {
        try {
            await api.delete(`/tags/${id_tag}/leituras/${id_leitura}`);
        } catch (error: any) {
            console.error('Erro ao remover tag:', error);
            throw error.response?.data || { erro: 'Erro ao remover tag' };
        }
    }
}

export const tagService = new TagService();