import api from '../services/api';

/**
 * Upload de arquivo com deleção automática do arquivo antigo
 * @param file - Arquivo novo para upload (Blob ou File)
 * @param oldFilename - Nome do arquivo antigo para deletar (opcional)
 * @param filename - Nome customizado para o arquivo (opcional)
 * @returns Promise com a resposta da API contendo { filename: string }
 */
export async function uploadFile(
  file: Blob | File,
  oldFilename?: string,
  filename?: string
): Promise<{ data: { filename: string } }> {
  console.log('📤 [uploadHelper] Iniciando upload...', {
    filename,
    oldFilename,
    fileSize: file.size,
    fileType: file.type,
  });

  const formdata = new FormData();
  formdata.append('file', file, filename || 'upload.jpg');

  // Se houver arquivo antigo, adiciona para deleção
  if (oldFilename) {
    console.log('🗑️ [uploadHelper] Arquivo antigo para deletar:', oldFilename);
    formdata.append('oldFile', oldFilename);
  }

  try {
    const response = await api.post('/upload', formdata);
    console.log('✅ [uploadHelper] Upload bem-sucedido:', response.data);
    return response;
  } catch (error: any) {
    console.error('❌ [uploadHelper] Erro no upload:', error);
    console.error('❌ [uploadHelper] Error response:', error.response?.data);
    throw error;
  }
}
