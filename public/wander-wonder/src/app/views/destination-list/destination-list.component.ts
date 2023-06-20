import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from 'src/app/shared/models/destination-model';
import { DestinationService } from 'src/app/shared/services/destination-service';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {
  destinationName: string = "";
  destinations!: Destination[];
  offset = 0;
  count = 10;
  search = "";

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["search"]) {
        this.search = params["search"];
        this.getAllDestinationsList();
        this.getCount();
      } else {
        this.search = "";
        this.getAllDestinationsList();
        this.getCount();
      }
    });
  }

  getAllDestinationsList() {
    let query: string = "?offset=" + this.offset + "&count=" + this.count + "&search=" + this.search;
    this.destinationService.getAll(query).subscribe({
      next: (destination) => {
        this.destinations = destination.data;
        console.log(destination);
      }
    });
  }

  getCount() {

  }

  detailView(destinationId: string) {
    this.router.navigate(["admin/destinations/destinationId" + destinationId]);
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
    // return(+this.offset + this.count) >= this.dishCount;
  }

}
