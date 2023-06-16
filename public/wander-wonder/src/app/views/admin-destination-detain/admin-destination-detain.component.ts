import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Destination } from 'src/app/shared/models/destination-model';

@Component({
  selector: 'app-admin-destination-detain',
  templateUrl: './admin-destination-detain.component.html',
  styleUrls: ['./admin-destination-detain.component.css']
})
export class AdminDestinationDetainComponent implements OnInit {
  editForm!: FormGroup;
 destination!: Destination;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: new FormControl(),
      description: new FormControl(),
      expense: new FormControl(),
      photo: new FormControl(),
      country: new FormControl(),
      airports: this.formBuilder.array([])
    });
  }

  get airports(): FormArray {
    return this.editForm.get('airports') as FormArray;
  }

  addAirport() {
    this.airports.push(new FormControl());
  }

  onSubmit() {
    this.destination = new Destination();
    if (this.editForm.valid) {

      const updatedDestination = this.editForm.value;
      console.log(updatedDestination);
      this.destination.name = updatedDestination.name.value
      this.destination.description = updatedDestination.description.value
      this.destination.expense = updatedDestination.expense.value
      this.destination.photo = updatedDestination.photo.value
      this.destination.country = updatedDestination.country.value

     console.log(this.destination);
    }
  }
}
