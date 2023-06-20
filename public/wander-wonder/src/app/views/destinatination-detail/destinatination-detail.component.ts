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
}
