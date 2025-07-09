export interface Agendamento {
  agendamentoId: string;       
  tituloAgendamento: string;
  clienteUserId: string;  
  profissionalUserId: string;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  observacoes: string;
}
