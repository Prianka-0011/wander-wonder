import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DestinationService } from 'src/app/shared/services/destination-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  countryName: string=""
  constructor(private destinationService: DestinationService) {}

  onSubmit(searchForm: NgForm) {
    console.log(this.countryName)
    let query = "";
    let offset = 0;
    let count = 4;
    query+= "offset="+offset;
    query+= "&count="+count;
    query+= "&search="+this.countryName
    this.destinationService.getAllByCountry(query).subscribe({
      next:(destination) => {
        console.log(destination);
      }
    })
  }
}
