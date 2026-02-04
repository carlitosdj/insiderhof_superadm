/**
 * Detecta automaticamente a URL da API baseado no domínio
 * Segue a convenção: superadm.<dominio> → api.<dominio>
 *
 * Exemplos:
 * - superadm.insiderhof.com.br → https://api.insiderhof.com.br
 * - superadm.insiderflow.com.br → https://api.insiderflow.com.br
 * - localhost → http://localhost:3007
 */
export function getApiUrl(): string {
  const hostname = window.location.hostname;

  // Localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3007';
  }

  // Produção: Extrai domínio base e cria URL da API
  const domain = hostname.replace(/^(superadm|adm|www|app)\./, '');
  return `https://api.${domain}`;
}

/**
 * Retorna a URL completa para upload de arquivos
 * @param filename - Nome do arquivo
 * @returns URL completa do arquivo
 */
export function getFileUrl(filename: string): string {
  return `${getApiUrl()}/upload/file/${filename}`;
}

/**
 * Detecta automaticamente a URL do app (student portal) baseado no domínio
 * Segue a convenção: superadm.<dominio> → app.<dominio>
 *
 * Exemplos:
 * - superadm.insiderhof.com.br → https://app.insiderhof.com.br
 * - superadm.insiderflow.com.br → https://app.insiderflow.com.br
 * - localhost → http://localhost:3002
 */
export function getAppUrl(): string {
  const hostname = window.location.hostname;

  // Localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3002';
  }

  // Se já está em app.*, retorna a própria URL base
  if (hostname.startsWith('app.')) {
    return `https://${hostname}`;
  }

  // Produção: Extrai domínio base e cria URL do app
  const domain = hostname.replace(/^(api|adm|superadm|www)\./, '');
  return `https://app.${domain}`;
}

/**
 * Retorna a URL completa para arquivos estáticos do app
 * @param filename - Nome do arquivo (ex: "image.jpg", "notfound.jpg")
 * @returns URL completa do arquivo estático
 */
export function getAppFileUrl(filename: string): string {
  return `${getAppUrl()}/files/${filename}`;
}
