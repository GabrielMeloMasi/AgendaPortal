import { Injectable } from '@angular/core';
import { Horario } from '../models/agenda.model';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  horas = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  getAgendaSemana(): Horario[][] {
    return this.horas.map(hora =>
      this.diasSemana.map(dia => ({
        hora,
        dia,
        disponivel: Math.random() > 0.4 
      }))
    );
  }
}
