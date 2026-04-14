import api from './api';
import type  { 
  
  CriarAnotacaoDTO, 
  AtualizarAnotacaoDTO,
  AnotacaoResponse,
  AnotacoesPorPaginaResponse 
} from '../types/anotacao';

class AnotacaoService {
  // Criar uma nova anotação
  async criarAnotacao(dados: CriarAnotacaoDTO): Promise<AnotacaoResponse> {
    try {
      const response = await api.post<AnotacaoResponse>('/anotacoes', dados);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar anotação:', error);
      throw error.response?.data || { erro: 'Erro ao criar anotação' };
    }
  }

  // Buscar anotações por leitura e página
  async buscarPorPagina(id_leitura: number, pagina: number): Promise<AnotacoesPorPaginaResponse> {
    try {
      const response = await api.get<AnotacoesPorPaginaResponse>(
        `/anotacoes/leitura/${id_leitura}/pagina/${pagina}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar anotações:', error);
      throw error.response?.data || { erro: 'Erro ao buscar anotações' };
    }
  }

  // Atualizar uma anotação
  async atualizarAnotacao(id: number, dados: AtualizarAnotacaoDTO): Promise<AnotacaoResponse> {
    try {
      const response = await api.put<AnotacaoResponse>(`/anotacoes/${id}`, dados);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar anotação:', error);
      throw error.response?.data || { erro: 'Erro ao atualizar anotação' };
    }
  }

  // Deletar uma anotação
  async deletarAnotacao(id: number): Promise<{ mensagem: string }> {
    try {
      const response = await api.delete(`/anotacoes/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao deletar anotação:', error);
      throw error.response?.data || { erro: 'Erro ao deletar anotação' };
    }
  }
}

export const anotacaoService = new AnotacaoService();