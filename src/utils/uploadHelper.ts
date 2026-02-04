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
  const formdata = new FormData();
  formdata.append('file', file, filename || 'upload.jpg');

  // Se houver arquivo antigo, adiciona para deleção
  if (oldFilename) {
    formdata.append('oldFile', oldFilename);
  }

  return api.post('/upload', formdata);
}
