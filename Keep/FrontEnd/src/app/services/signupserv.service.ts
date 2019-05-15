import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class SignupservService {

  constructor(private http:HttpClient) { }

  signingUp( {username, password}){
    return this.http.post('http://localhost:3000/auth/v1/register', {username, password})
  }



}
