import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{
  token: any;
  ngOnInit(): void {
    this.getToken()
  }
  getToken() {
    this.token = localStorage.getItem("token");
    console.log(this.token)
  }

}
