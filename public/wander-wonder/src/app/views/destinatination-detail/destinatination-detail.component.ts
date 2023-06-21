import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destination } from 'src/app/shared/models/destination-model';
import { DestinationService } from 'src/app/shared/services/destination-service';

@Component({
  selector: 'app-destinatination-detail',
  templateUrl: './destinatination-detail.component.html',
  styleUrls: ['./destinatination-detail.component.css']
})
export class DestinatinationDetailComponent implements OnInit{

  destination!: Destination;

  constructor(private destinationService: DestinationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const destinationId = params['destinationId'];
      this.getDestinationDetail(destinationId)
    });
  }

  getDestinationDetail(destinationId:string) {
    this.destinationService.getOne(destinationId).subscribe({
      next:(destination) => {
        console.log(destination);
        this.destination=destination.data
      },
      error:(error) => {

      }

    })
  }

  addToFavorite() {
    const payload = {
      userId: "",
      destinationId: this.destination._id
    }
    const authData = localStorage.getItem("token");
    if (authData) {
      payload.userId = JSON.parse(authData).userId;
    }
    this.destinationService.addToFav(payload).subscribe({
      next: (destination) => {
        console.log(destination);
      },
      error: (error) => {

      }

    })
  }
}
