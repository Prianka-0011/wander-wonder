import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl="http://localhost:7272/api/"
  constructor(private http:HttpClient) {

   }
  //  login(user){

  //  }
}
