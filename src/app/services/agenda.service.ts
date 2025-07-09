import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';
import { environment } from 'src/environments/environment.development';


@Injectable({ providedIn: 'root' })
export class AgendaService {
  
  private readonly API_URL = environment.apiUrl + '/agendamento/';

    constructor(private http: HttpClient) {}

    getAgendamentos(clientId:string): Observable<Agendamento[]>{
      let urlApi = this.API_URL + clientId;
      return this.http.get<Agendamento[]>(urlApi);
    }

}
