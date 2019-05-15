import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Label } from '../labels';
import {AuthenticationService} from './authentication.service';
import { Subject } from 'rxjs';
import {NotesService} from '../services/notes.service';

@Injectable()
export class LabelsService {
  public token: any;
  // labels:Array<Label>=[];
  errMessage:string;
  userId:string;
  totalLabels:Array<Label>=[];
  selectingLabels:Array<Label>;
  labelsSubject: BehaviorSubject<Array<Label>>;
  sellabelsSubject: BehaviorSubject<Array<Label>>;
  constructor(private _authService:AuthenticationService,private http:HttpClient, private notesService:NotesService) {
    this.labelsSubject = new BehaviorSubject<Array<Label>>([]);
    this.sellabelsSubject = new BehaviorSubject<Array<Label>>([]);
   }
   
  getLabels(){
    this.userId = this.notesService.getUserId()
    this.token = this._authService.getBearerToken();
    return this.http.get<Label[]>('http://localhost:3000/api/v1/labels/'+this.userId, {headers: new HttpHeaders().set('Authorization', `Bearer ${this._authService.getBearerToken()}`)
      }).subscribe(res=>{
      console.log("Total labels",res)
      this.setTotalLabels(res);
     
    },
    err=>{
      this.errMessage ="Error in getting labels"
    });
  }

  setTotalLabels(labels){
    this.totalLabels = labels
    this.labelsSubject.next(this.totalLabels)
  }

  getTotalLabels(){
    return this.totalLabels
  }
  
  getTotalLabelsSubject():Observable<Array<Label>>{
    return this.labelsSubject.asObservable()
  }
  
  addLabel(label): Observable<Label>{
    console.log("label to be added to server",label);
    this.token = this._authService.getBearerToken();
    return this.http.post<Label>('http://localhost:3000/api/v1/labels', label, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    });
  }

  deleteLabel(labelId): Observable<Label>{
    console.log("deleting labelId",labelId)
    return this.http.request<Label>('delete', `http://localhost:3000/api/v1/labels/`, 
    { body: { 
      "labelId":labelId
     },
       headers: new HttpHeaders()
       .set('Authorization', `Bearer ${this._authService.getBearerToken()}`) 
    });
  }

  putLabel(labels){
    console.log("putLabel",labels)
     return this.http.put(`http://localhost:3000/api/v1/multilabels/`,labels,{
          headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this._authService.getBearerToken()}`)
      })
  }
}