import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  loginPage:boolean = false;
  loginSubject:Subject<boolean>;
  constructor(private http: HttpClient) {
    this.loginSubject = new Subject<boolean>();
  }
  setLoggedin(value:boolean){
    this.loginPage = value
    this.loginSubject.next(this.loginPage)
  }
  
  getAllUsers(){
    return this.http.get("http://localhost:3000/api/v1/allusers", {headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)});
  }

  getLoggedin():Observable<boolean>{
    return this.loginSubject.asObservable()
  }

  authenticateUser( {username, password}) {
    console.log("username",username)
    return this.http.post('http://localhost:3000/auth/v1/login', {username, password});
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.http.post('http://localhost:3000/auth/v1/isAuthenticated', {}, {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    })
    .map((res) => res['isAuthenticated'])
    .toPromise();
  }
}
