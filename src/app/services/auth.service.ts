import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserLogin, UserRegister } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/Auth/';
  constructor(private http: HttpClient) { }

  register(userRegister: UserRegister): Observable<UserRegister> {
    let apiUri = this.apiUrl + 'register';
    return this.http.post<UserRegister>(apiUri, userRegister)    
  }

  login(userLogin: UserLogin): Observable<UserLogin> {
    let apiUri = this.apiUrl + 'login';
    return this.http.post<UserLogin>(apiUri, userLogin)    
  }

}
