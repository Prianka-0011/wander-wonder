import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/services/destination-service';
import { Destination } from "../../shared/models/destination-model";
import { get } from 'mongoose';
import { json } from 'express';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
destination!: Destination[];
  constructor(private destinationService : DestinationService) {

  }
  ngOnInit(): void {
    this.getDestinations();
  }
  getDestinations()
  {
    let query = "";
    let offset = 0;
    let count = 4;
    query+= "offset="+offset;
    query+= "&count="+count;
    this.destinationService.getAll(query).subscribe({

      next: (destinations) => {
        console.log("destination", destinations.message)
        this.destination=destinations.data;
      },
      error: ()=> {

      },
    })
  }
}
