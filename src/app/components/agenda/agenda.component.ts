import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import { Horario } from 'src/app/models/agenda.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  diasSemana: string[] = [];
  horarios: string[] = [];
  agenda: Horario[][] = []; // [horas][dias]

  constructor(private agendaService: AgendaService) {}

  ngOnInit() {
    this.diasSemana = this.agendaService.diasSemana;
    this.horarios = this.agendaService.horas;
    this.agenda = this.agendaService.getAgendaSemana();
  }

  selecionar(h: Horario) {
    if (h.disponivel) {
      alert(`Selecionado: ${h.dia} às ${h.hora}`);
    }
  }
}
