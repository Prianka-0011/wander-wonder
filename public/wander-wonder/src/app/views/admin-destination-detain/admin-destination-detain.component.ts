import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Destination } from 'src/app/shared/models/destination-model';
import { DestinationService } from 'src/app/shared/services/destination-service';

@Component({
  selector: 'app-admin-destination-detain',
  templateUrl: './admin-destination-detain.component.html',
  styleUrls: ['./admin-destination-detain.component.css']
})
export class AdminDestinationDetainComponent implements OnInit {
  editForm!: FormGroup;
 destination!: Destination;
  constructor(private formBuilder: FormBuilder, private destinationService: DestinationService) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: new FormControl(),
      description: new FormControl(),
      expense: new FormControl(),
      photo: new FormControl(),
      country: this.formBuilder.group({
        name: [""],
        population: [""]
      }),
       airports: this.formBuilder.array([
        this.createAirportGroup()
      ])
    });
  }
  createAirportGroup() {
    return this.formBuilder.group({
      name: [""],
      city: [""]
    });
  }
  get airports(): FormArray {
    return this.editForm.get('airports') as FormArray;
  }

  addAirport() {
    const airports = this.editForm.get('airports') as FormArray;
    airports.push(this.createAirportGroup());
  }

  removeAirport(index: number) {
    const airports = this.editForm.get('airports') as FormArray;
    airports.removeAt(index);
  }


  onSubmit() {
    this.destination = new Destination();
    if (this.editForm.valid) {

      const updatedDestination = this.editForm.value;
      console.log(updatedDestination);
    this.destination = updatedDestination;
    this.destinationService.save(this.destination)
     console.log("destination",this.destination);
     this.destinationService.save(this.destination).subscribe({
      next:(destination) => {
      console.log(destination);
      }
     })
    }
  }
}
