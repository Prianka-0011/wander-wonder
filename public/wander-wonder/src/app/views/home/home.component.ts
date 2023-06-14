import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/services/destination-service';
import { Destination } from "../../shared/models/destination-model";
import { get } from 'mongoose';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
destination:Destination[]=[];
  constructor(private destinationService : DestinationService) {

  }
  ngOnInit(): void {
    this.getDestinations();
  }
  getDestinations()
  {
    this.destinationService.getAll().subscribe((res:Destination[])=>{
      this.destination=res
    },(err:any)=>{

    })
  }
}
