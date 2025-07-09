import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import { Agendamento } from 'src/app/models/agendamento.model';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
   CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  userId?: string;
  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {

    const userData = JSON.parse(localStorage.getItem('userData') || '{}')

    this.agendaService.getAgendamentos(userData.userId).subscribe((data: Agendamento[]) => {
      this.events = data.map(agendamento => ({
        title: agendamento.tituloAgendamento,
        start: new Date(agendamento.dataHoraInicio),
        end: new Date(agendamento.dataHoraFim),
        color: {
          primary: '#4F46E5',
          secondary: '#E0E7FF'
        },
        meta: {
          observacoes: agendamento.observacoes,
          clienteId: agendamento.clienteUserId,
          profissionalId: agendamento.profissionalUserId
        },
        allDay: false
      }));
    });
  }
}
