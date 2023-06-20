import { Component, Input } from '@angular/core';
import { Destination } from '../../models/destination-model';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent {
  @Input()
  destination: Destination = new Destination();
}
