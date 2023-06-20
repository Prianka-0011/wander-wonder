import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Destination } from 'src/app/shared/models/destination-model';
import { DestinationService } from 'src/app/shared/services/destination-service';

@Component({
  selector: 'app-admin-destination-list',
  templateUrl: './admin-destination-list.component.html',
  styleUrls: ['./admin-destination-list.component.css']
})
export class AdminDestinationListComponent implements OnInit {

  destinationName: string=""
  destinations!: Destination[];
  query = "";
  offset = 0;
  count = 10;
  totalDestinations = 0;

  constructor(private destinationService: DestinationService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDestinationsList();
    this.getCount();
  }
  
  getAllDestinationsList() {
    this.query = "?offset="+this.offset+"&count="+this.count;
    this.destinationService.getAll(this.query).subscribe({
      next:(destination) => {
        this.destinations = destination.data;
      }
    })
  }

  editDestination(destination: Destination) {
    this.router.navigate(["admin/destinations/"+destination._id]);    
  }

  createNew() {
    this.router.navigate(["admin/destinations/add"])
  }

  getCount() {
    this.destinationService.getCount().subscribe({
      next: (destination) => {
        this.totalDestinations = destination.data;
      }
    });
  }

  prev() {
    this.offset = this.offset - this.count;
    this.getAllDestinationsList();
  }

  next() {
    this.offset = this.offset + this.count;
    this.getAllDestinationsList();
  }

  disablePrev() {
    return this.offset === 0;
  }

  disableNext() {
    return(+this.offset + this.count) >= this.totalDestinations;
  }

}
