import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";
import { Destination } from "../models/destination-model";

import { Injectable } from '@angular/core';
import { DestinationCount, DestinationList, OneDestination } from "../models/response";

@Injectable()
export class DestinationService {
  
  baseUrl="http://localhost:3000/api/"
  
  constructor(private http:HttpClient) {

  }

  getAll(query: string):Observable<DestinationList> {
    return this.http.get<DestinationList>(`${this.baseUrl}destinations`+query);
  }

  getCount():Observable<DestinationCount> {
    return this.http.get<DestinationCount>(`${this.baseUrl}destinations/count`);
  }

  getOne(destinatinId: string):Observable<OneDestination> {
    return this.http.get<OneDestination>(`${this.baseUrl}destinations/`+destinatinId);
  }

  save(destination:Destination):Observable<OneDestination> {
    return this.http.post<OneDestination>(`${this.baseUrl}destinations`,destination)
  }

  update(destination:Destination):Observable<OneDestination> {
    return this.http.put<OneDestination>(`${this.baseUrl}destinations/${destination._id}`,destination)
  }

  delete(destination: Destination):Observable<OneDestination> {
    return this.http.delete<OneDestination>(`${this.baseUrl}destinations/${destination._id}`)
  }
}
