import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { Observable } from 'rxjs/Observable';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl();
    password = new FormControl();
    public Bearertoken: any;
    public msg: string;
    public submitMessage: string;
    constructor(private _authService: AuthenticationService, public routerService: RouterService,private noteservice:NotesService) {
      
      this._authService.setLoggedin(false)
      // console.log("login header true")
    }
    loginSubmit() {
       this._authService.authenticateUser({username: this.username.value, password: this.password.value}).subscribe(
        res => {
          console.log("res",res)
          this.Bearertoken = res['token'];
          this._authService.setBearerToken(this.Bearertoken);
          console.log("setting userid",res['userid'])
          this.noteservice.setUserId(res['userid'])
          this.noteservice.setSubject()
          localStorage.setItem("loggedin","true")
          this._authService.setLoggedin(true)
          this.routerService.routeToDashboard();
          this.noteservice.setupSocketClient()
          
        },
        err => {
          if (err.status === 404) {
             this.submitMessage = err.message;
          }else {
             this.submitMessage = err.error.message;
          }
          return Observable.throw(this.submitMessage);
        }
      );

    }

    
}
