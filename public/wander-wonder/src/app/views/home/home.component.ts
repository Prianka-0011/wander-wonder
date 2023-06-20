import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/services/destination-service';
import { Destination } from "../../shared/models/destination-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  destinations!: Destination[];
  topDestinations!: Destination[];
  
  constructor(private destinationService : DestinationService) {

  }

  ngOnInit(): void {
    this.getDestinations();
    this.getTopDestinations();
  }

  getDestinations() {
    let query = "";
    let offset = 0;
    let count = 6;
    query+= "?offset="+offset;
    query+= "&count="+count;
    this.destinationService.getAll(query).subscribe({
      next: (destinations) => {
        this.destinations = destinations.data;
      },
      error: ()=> {

      },
    })
  }

  getTopDestinations() {
    let query = "";
    let offset = 0;
    let count = 4;
    let search = "Bangladesh";
    query += "?offset="+offset;
    query += "&count="+count;
    query += "&search="+search;
    this.destinationService.getAll(query).subscribe({
      next: (destinations) => {
        this.topDestinations = destinations.data;
      },
      error: ()=> {

      },
    })
  }
}
