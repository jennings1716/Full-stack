import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {SignupservService} from '../services/signupserv.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  statusString;
  username = new FormControl();
  password = new FormControl();
  value;
  constructor(private signupserv:SignupservService) { }

  ngOnInit() {
  }

  signupSubmit(){
    console.log("sign up")
    this.signupserv.signingUp({username:this.username.value,password:this.password.value}).subscribe(
      res => {
          this.statusString = "Successfully Signed up";
          this.value="green";
          console.log("this.value", this.value)
         
        },
        err => {
          this.statusString = err.error.message;
           this.value="red";
        })

  }

      

}
