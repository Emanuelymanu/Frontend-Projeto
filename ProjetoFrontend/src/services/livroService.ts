import api from "./api";
import { type Livro, type LivroResponse, type LivroInput } from "../types/livro";
import { AxiosError } from "axios";

interface ApiError {
    message: string;
}

class LivroService {
    async listar(): Promise<Livro[]> {
        try {
            const response = await api.get('/livros');
            // Corrigido para pegar do campo correto do backend
            return Array.isArray(response.data.livros) ? response.data.livros : [];
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Erro ao listar livros:', axiosError.message);
            return [];
        }
    }

    async criar(livro: LivroInput): Promise<Livro> {
        try {
            const response = await api.post<LivroResponse>('/livros', livro);

            if (response.data.sucesso && !Array.isArray(response.data.data)) {
                return response.data.data;
            }
            throw new Error('Erro ao criar livro');
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            throw axiosError.response?.data || { message: 'Erro ao criar livro' };
        }
    }
    async editar(id: number, livro: Partial<LivroInput>): Promise<Livro> {
        try {
            const response = await api.put<LivroResponse>(`/livros/editar/${id}`, livro);

            if (response.data.sucesso && !Array.isArray(response.data.data)) {
                return response.data.data;
            }
            throw new Error('Erro ao editar livro');
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            throw axiosError.response?.data || { message: 'Erro ao editar livro' };
        }
    }
    async deletar(id: number): Promise<void> {
        try {
            await api.delete(`/livros/deletar/${id}`);
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            throw axiosError.response?.data || { message: 'Erro ao deletar livro' };
        }
    }
}

export default new LivroService();