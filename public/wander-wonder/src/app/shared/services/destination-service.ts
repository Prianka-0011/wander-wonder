import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";
import { Destination } from "../models/destination-model";

import { Injectable } from '@angular/core';
import { DestinationList } from "../models/response";

@Injectable()
export class DestinationService {
  baseUrl="http://localhost:7272/api/"
  constructor(private http:HttpClient) {

  }
  getAll(query: string):Observable<DestinationList>
  {
    console.log(query)
    return this.http.get<DestinationList>(`${this.baseUrl}destinations?`+query);
  }
  getAllByCountry(query: string):Observable<DestinationList>
  {
    console.log(query)
    return this.http.get<DestinationList>(`${this.baseUrl}country/destinations?`+query);
  }
}
