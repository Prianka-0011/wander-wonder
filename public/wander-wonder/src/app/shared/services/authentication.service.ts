import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AuthenticatiobResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl="http://localhost:7272/api/"

  header = { "Content-Type": "application/json" };
  constructor(private http:HttpClient) {

  }

  register(user:User){
    return this.http.post(this.baseUrl+"register",user, { headers: this.header })
  }

  login(user:User):Observable<AuthenticatiobResponse>{
    return this.http.post<AuthenticatiobResponse>(this.baseUrl+"login",user, { headers: this.header })
  }
}