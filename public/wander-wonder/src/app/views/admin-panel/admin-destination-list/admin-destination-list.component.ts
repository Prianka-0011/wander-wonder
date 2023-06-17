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
export class AdminDestinationListComponent implements OnInit{
  destinationName: string=""
  destinations!: Destination[];
  query = "";
  offset = 0;
  count = 10;
constructor(private destinationService: DestinationService, private router: Router) {}
ngOnInit(): void {
  this.getAllDestinationsList();
}

getAllDestinationsList() {
  this.query+= "offset="+this.offset;
  this.query+= "&count="+this.count;

  this.destinationService.getAll(this.query).subscribe({
    next:(destination) => {
      this.destinations = destination.data;
      console.log(destination);
    }
  })
}
editDestination() {

}
createNew()
{
  this.router.navigate(["admin/destinations/add"])
}
// onSubmit(searchForm: NgForm) {

//   this.query+= "offset="+this.offset;
//   this.query+= "&count="+this.count;
//   this.query+= "&search="+this.destinationName
//   this.destinationService.getAll(this.query).subscribe({
//     next:(destination) => {
//       this.destinations = destination.data;
//       console.log(destination);
//     }
//   })
// }
}
