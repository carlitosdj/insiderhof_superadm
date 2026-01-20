import moment from 'moment';

/**
 * Formata data de evento
 * @param date - Data em formato ISO ou Date
 * @param format - Formato de saída (padrão: DD/MM/YYYY HH:mm)
 * @returns Data formatada
 */
export const formatEventDate = (
  date: string | Date | null | undefined,
  format: string = 'DD/MM/YYYY HH:mm'
): string => {
  if (!date) return '-';
  return moment(date).format(format);
};

/**
 * Retorna a classe de cor do badge baseado no status do evento
 * @param status - Status do evento
 * @returns Classe CSS do badge
 */
export const getEventStatusColor = (status?: string): string => {
  switch (status) {
    case 'draft':
      return 'badge-light-secondary';
    case 'open':
      return 'badge-light-primary';
    case 'full':
      return 'badge-light-warning';
    case 'closed':
      return 'badge-light-secondary';
    case 'in_progress':
      return 'badge-light-info';
    case 'finished':
      return 'badge-light-success';
    case 'cancelled':
      return 'badge-light-danger';
    default:
      return 'badge-light-secondary';
  }
};

/**
 * Retorna o texto do status do evento em português
 * @param status - Status do evento
 * @returns Texto do status
 */
export const getEventStatusText = (status?: string): string => {
  switch (status) {
    case 'draft':
      return 'Rascunho';
    case 'open':
      return 'Aberto';
    case 'full':
      return 'Lotado';
    case 'closed':
      return 'Fechado';
    case 'in_progress':
      return 'Em Andamento';
    case 'finished':
      return 'Finalizado';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status || 'Desconhecido';
  }
};

/**
 * Calcula a taxa de ocupação do evento
 * @param sold - Quantidade de tickets vendidos
 * @param capacity - Capacidade total do evento
 * @returns Taxa de ocupação em percentual (0-100)
 */
export const calculateOccupancyRate = (
  sold: number = 0,
  capacity: number = 0
): number => {
  if (!capacity || capacity <= 0) return 0;
  const rate = (sold / capacity) * 100;
  return Math.min(Math.round(rate), 100); // Máximo 100%
};

/**
 * Valida se as datas de início e fim do evento são válidas
 * @param startDate - Data de início
 * @param endDate - Data de término
 * @returns Objeto com validação e mensagem de erro
 */
export const validateEventDates = (
  startDate: string | Date | null | undefined,
  endDate: string | Date | null | undefined
): { isValid: boolean; error?: string } => {
  if (!startDate) {
    return { isValid: false, error: 'Data de início é obrigatória' };
  }

  if (!endDate) {
    return { isValid: false, error: 'Data de término é obrigatória' };
  }

  const start = moment(startDate);
  const end = moment(endDate);

  if (!start.isValid()) {
    return { isValid: false, error: 'Data de início inválida' };
  }

  if (!end.isValid()) {
    return { isValid: false, error: 'Data de término inválida' };
  }

  if (end.isBefore(start)) {
    return {
      isValid: false,
      error: 'Data de término não pode ser anterior à data de início',
    };
  }

  return { isValid: true };
};

/**
 * Retorna a classe de cor do badge baseado no tipo de ticket
 * @param type - Tipo do ticket
 * @returns Classe CSS do badge
 */
export const getTicketTypeBadge = (type?: string): string => {
  switch (type) {
    case 'normal':
      return 'badge-light-primary';
    case 'vip':
      return 'badge-light-warning';
    case 'free':
      return 'badge-light-success';
    case 'sponsor':
      return 'badge-light-info';
    case 'speaker':
      return 'badge-light-secondary';
    case 'staff':
      return 'badge-light-dark';
    default:
      return 'badge-light-primary';
  }
};

/**
 * Retorna o texto do tipo de ticket em português
 * @param type - Tipo do ticket
 * @returns Texto do tipo
 */
export const getTicketTypeText = (type?: string): string => {
  switch (type) {
    case 'normal':
      return 'Normal';
    case 'vip':
      return 'VIP';
    case 'free':
      return 'Gratuito';
    case 'sponsor':
      return 'Patrocinador';
    case 'speaker':
      return 'Palestrante';
    case 'staff':
      return 'Staff';
    default:
      return type || 'Normal';
  }
};

/**
 * Retorna o texto do status de check-in em português
 * @param status - Status do check-in
 * @returns Texto do status
 */
export const getCheckinStatusText = (status?: string): string => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'checked_in':
      return 'Realizado';
    case 'cancelled':
      return 'Cancelado';
    case 'no_show':
      return 'Ausente';
    default:
      return status || 'Pendente';
  }
};

/**
 * Retorna a classe de cor do badge baseado no status de check-in
 * @param status - Status do check-in
 * @returns Classe CSS do badge
 */
export const getCheckinStatusBadge = (status?: string): string => {
  switch (status) {
    case 'pending':
      return 'badge-light-warning';
    case 'checked_in':
      return 'badge-light-success';
    case 'cancelled':
      return 'badge-light-danger';
    case 'no_show':
      return 'badge-light-secondary';
    default:
      return 'badge-light-warning';
  }
};

/**
 * Retorna o texto do tipo de sessão em português
 * @param type - Tipo da sessão
 * @returns Texto do tipo
 */
export const getSessionTypeText = (type?: string): string => {
  switch (type) {
    case 'talk':
      return 'Palestra';
    case 'workshop':
      return 'Workshop';
    case 'panel':
      return 'Painel';
    case 'networking':
      return 'Networking';
    case 'break':
      return 'Intervalo';
    default:
      return type || 'Palestra';
  }
};

/**
 * Retorna a classe de cor do badge baseado no tipo de sessão
 * @param type - Tipo da sessão
 * @returns Classe CSS do badge
 */
export const getSessionTypeBadge = (type?: string): string => {
  switch (type) {
    case 'talk':
      return 'badge-light-primary';
    case 'workshop':
      return 'badge-light-info';
    case 'panel':
      return 'badge-light-warning';
    case 'networking':
      return 'badge-light-success';
    case 'break':
      return 'badge-light-secondary';
    default:
      return 'badge-light-primary';
  }
};

/**
 * Formata duração em minutos para formato legível
 * @param minutes - Duração em minutos
 * @returns Duração formatada (ex: "1h 30min", "45min")
 */
export const formatDuration = (minutes?: number): string => {
  if (!minutes || minutes <= 0) return '-';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}min`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${mins}min`;
  }
};

/**
 * Calcula vagas restantes
 * @param capacity - Capacidade total
 * @param sold - Tickets vendidos
 * @returns Vagas restantes
 */
export const calculateRemainingSpots = (
  capacity: number = 0,
  sold: number = 0
): number => {
  return Math.max(capacity - sold, 0);
};

/**
 * Verifica se o evento está lotado
 * @param capacity - Capacidade total
 * @param sold - Tickets vendidos
 * @returns True se lotado
 */
export const isEventFull = (capacity: number = 0, sold: number = 0): boolean => {
  return sold >= capacity && capacity > 0;
};

/**
 * Calcula taxa de check-in
 * @param checkins - Total de check-ins realizados
 * @param totalTickets - Total de tickets
 * @returns Taxa de check-in em percentual (0-100)
 */
export const calculateCheckinRate = (
  checkins: number = 0,
  totalTickets: number = 0
): number => {
  if (!totalTickets || totalTickets <= 0) return 0;
  const rate = (checkins / totalTickets) * 100;
  return Math.min(Math.round(rate), 100);
};

/**
 * Formata horário de sessão (apenas hora e minuto)
 * @param datetime - Data/hora completa
 * @returns Horário formatado (ex: "14:30")
 */
export const formatSessionTime = (
  datetime: string | Date | null | undefined
): string => {
  if (!datetime) return '-';
  return moment(datetime).format('HH:mm');
};

/**
 * Verifica se uma sessão já aconteceu
 * @param endTime - Data/hora de término da sessão
 * @returns True se já terminou
 */
export const isSessionPast = (
  endTime: string | Date | null | undefined
): boolean => {
  if (!endTime) return false;
  return moment(endTime).isBefore(moment());
};

/**
 * Verifica se uma sessão está acontecendo agora
 * @param startTime - Data/hora de início
 * @param endTime - Data/hora de término
 * @returns True se está em andamento
 */
export const isSessionInProgress = (
  startTime: string | Date | null | undefined,
  endTime: string | Date | null | undefined
): boolean => {
  if (!startTime || !endTime) return false;
  const now = moment();
  return now.isBetween(moment(startTime), moment(endTime));
};
