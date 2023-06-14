import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";
import { Destination } from "../models/destination-model";

import { Injectable } from '@angular/core';

@Injectable()
export class DestinationService {
  baseUrl="http://localhost:7272/api/"
  constructor(private http:HttpClient) {

  }
  getAll():Observable<Destination[]>
  {
    return this.http.get<Destination[]>(`${this.baseUrl}/destinations`);
  }
}
