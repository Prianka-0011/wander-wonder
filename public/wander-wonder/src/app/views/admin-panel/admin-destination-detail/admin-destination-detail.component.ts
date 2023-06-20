import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from 'src/app/shared/models/destination-model';
import { DestinationService } from 'src/app/shared/services/destination-service';

@Component({
  selector: 'app-admin-destination-detail',
  templateUrl: './admin-destination-detail.component.html',
  styleUrls: ['./admin-destination-detail.component.css']
})
export class AdminDestinationDetailComponent implements OnInit {
  
  editForm!: FormGroup;
  destination!: Destination;
  isUpdating = false;

  constructor(private formBuilder: FormBuilder, private destinationService: DestinationService, private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {

    let destinationId = this.activatedRoute.snapshot.params["destinationId"];
    if (destinationId) {
      this.getDestinationDetail(destinationId);
      this.isUpdating = true;
    }

    this.editForm = this.formBuilder.group({
      _id: new FormControl(),
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
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file)
    this.editForm.patchValue({ photo: file });
    event.target.value = '';
  }

  getDestinationDetail(destinationId: string) {
    this.destinationService.getOne(destinationId).subscribe({
      next: (destination) => {
        this.editForm.patchValue({
          _id: destination.data._id,
          name: destination.data.name,
          description: destination.data.description,
          expense: destination.data.expense,
          // photo: destination.data.photo,
          country: {
            name: destination.data.country.name,
            population: destination.data.country.population
          }
        });
  
        const airports = this.editForm.get('airports') as FormArray;
        while (airports.length !== 0) {
          airports.removeAt(0);
        }

        destination.data.airports.forEach((airport: any) => {
          airports.push(this.formBuilder.group({
            _id: airport._id,
            name: airport.name,
            city: airport.city
          }));
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }  
  
  onSubmit() {
    this.destination = new Destination();
    if (this.editForm.valid) {      
      const updatedDestination = this.editForm.value;
      console.log(updatedDestination);
      this.destination = updatedDestination;
      if (this.isUpdating) {
        this.destinationService.update(this.destination).subscribe({
          next:(destination) => {
            console.log(destination);
          },
          error: (error) => {
            console.log(error);            
          },
          complete: () => {
            alert("Destination has been updated!")
            this.router.navigate(["/admin/destinations"])
          }
        })
      } else {
        this.destinationService.save(this.destination).subscribe({
          next:(destination) => {
            console.log(destination);
          },
          error: (error) => {
            console.log(error);            
          },
          complete: () => {
            alert("Destination has been added!")
            this.router.navigate(["/admin/destinations"])
          }
        })
      }
    }
  }
  
  deleteDestination(event: any) {
    event.preventDefault();
    const destination = this.editForm.value;
    this.destinationService.delete(destination).subscribe({
      next:(destination) => {
        console.log(destination);
      },
      error: (error) => {
        console.log(error);            
      },
      complete: () => {
        alert("Destination has been deleted!")
        this.router.navigate(["/admin/destinations"])
      }
    })
  }
}
