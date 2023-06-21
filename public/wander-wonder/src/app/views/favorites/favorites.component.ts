import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from 'src/app/shared/models/destination-model';
import { DestinationService } from 'src/app/shared/services/destination-service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  destinationName: string = "";
  destinations!: Destination[];
  offset = 0;
  count = 6;
  search = "";
  totalDestinations = 0;

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    let userId = "";
    const authData = localStorage.getItem("token");
    if (authData) {
      userId = JSON.parse(authData).userId;
    }
    this.destinationService.getFavorites(userId).subscribe({
      next: (destination: any) => {
        this.destinations = destination.data.favoriteDestinations;
      }
    });
  }

  detailView(destinationId: string) {
    this.router.navigate(["admin/destinations/destinationId" + destinationId]);
  }

}
