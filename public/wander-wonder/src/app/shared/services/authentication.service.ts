import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthenticatiobResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  baseUrl="http://localhost:3000/api/"

  constructor(private http:HttpClient) {

  }

  register(user:User){
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl+"register",user)
  }

  login(user:User):Observable<AuthenticatiobResponse>{
    const headers = this.getHeaders();
    return this.http.post<AuthenticatiobResponse>(this.baseUrl+"login",user, {headers})
  }

  isLoggedIn(): Observable<boolean> {
    const status = localStorage.getItem("isLoggedIn");
    if (status && status === "true") {
      this.isLoginStatus.next(true);
    } else {
      this.isLoginStatus.next(false);
    }
    return (this.isLoginStatus);
  }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }
}
