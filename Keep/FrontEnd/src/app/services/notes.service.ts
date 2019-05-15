import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Note } from '../note';
import {AuthenticationService} from './authentication.service';
import { Subject } from 'rxjs';
import { Label } from '../labels';
import * as io from 'socket.io-client';

@Injectable()
export class NotesService {

  notes: Array<Note>=[];
  notesSubject: BehaviorSubject<Array<Note>>;
  public token: any;
  userId:string;
  subject:Subject<boolean>;
  totalNotes:Array<Note>;
  searchNotes: Array<Note>;
  selectedNotes:Array<Note>;
  selectedNotesSubject:BehaviorSubject<Array<Note>>;
  reminderTitles:Array<string>=[];
  reminderTitlesSubject:BehaviorSubject<Array<string>>;
  socket: SocketIOClient.Socket;
  notificationSubject:BehaviorSubject<string>;
  constructor(private http: HttpClient, private _authService: AuthenticationService){  
    console.log("noteservice service")
    this.notesSubject = new BehaviorSubject<Array<Note>>([]);
    this.selectedNotesSubject = new BehaviorSubject<Array<Note>>([]);
    this.reminderTitlesSubject = new BehaviorSubject<Array<string>>([]);
    this.notificationSubject = new BehaviorSubject<string>("");
    this.subject = new Subject<boolean>();
    // if(localStorage.getItem("userId")){
    //   this.socket = io.connect("http://localhost:3000",{path:"/api/v1/sockets/reminder"});
    //   this.socket.emit("register",{user:localStorage.getItem("userId")})
    //   this.socket.on('notification',(data)=>{
    //     if(data!=null){
    //       this.fetchNotesFromServer();
    //       this.notificationSubject.next(data);
    //     }
    //   })
    // }
  }
  setupSocketClient(){
    if(localStorage.getItem("userId")){
      this.socket = io.connect("http://localhost:3000",{path:"/api/v1/sockets/reminder"});
      this.socket.emit("register",{user:localStorage.getItem("userId")})
      this.socket.on('notification',(data)=>{
        if(data!=null){
          this.fetchNotesFromServer();
          this.notificationSubject.next(data);
        }
      })
    }
  }


  fetchNotesFromServer(){
    this.userId = localStorage.getItem("userId");
    return this.http.get<Note[]>('http://localhost:3000/api/v1/notes/'+this.userId, {headers: new HttpHeaders().set('Authorization', `Bearer ${this._authService.getBearerToken()}`)
      }).subscribe((res) => {
      console.log("fetchNotesFromServer")
      this.notes = res;
      this.setTotalNotes(res)
      this._authService.setLoggedin(true)
      this.notesSubject.next(this.notes);
    });
  }

  // SUPPORTING FUNCTIONS
  setSubject(){
    if(localStorage.getItem("userId")){
      this.subject.next(true);
    }else{
       this.subject.next(false);
    }
  }

  setUserId(id){
    localStorage.setItem("userId",id);
  }

  getUserId(){
    return localStorage.getItem("userId");
  }

  setTotalNotes(notes){  
    this.totalNotes=notes;
  }

  getTotalNotes(){
    return this.totalNotes;
  }

  setSelectedNotes(notes){
    this.selectedNotes = notes
    this.selectedNotesSubject.next(this.selectedNotes)
  }

  getSelectedNotes(){
    return this.selectedNotesSubject.asObservable();
  }

  getNotes(): Observable<Array<Note>>{
      return this.notesSubject.asObservable();
  }

  searchingNotes(notes){
    this.notes= notes;
    this.notesSubject.next(this.notes);
  }

  setDisplayReminderTitles(titles){
    titles.forEach(title=>{
      if(this.reminderTitles.indexOf(title)<0){
        this.reminderTitles.push(title);
      }
      
    })
    this.reminderTitlesSubject.next(this.reminderTitles)
  }

  getDisplayReminderTitles():Observable<string[]>{
    return this.reminderTitlesSubject.asObservable()
  }

  shareNotes(receivers,message){
    console.log("THis.socket",this.socket)
    this.socket.emit('notify',{receiver:receivers,msg:message});
  }

  getNoteById(noteId): Note {
    return this.notes.find(i => i.noteId === noteId);
  }

  // BACKEND FUNCTIONS
  addNote(note): Observable<Note> {
    console.log("adding  note to server")
    this.token = this._authService.getBearerToken();
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    });
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.noteId}`, note, {
          headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this._authService.getBearerToken()}`)
       });
  }

  updateMultipleNotes(notes:Array<Note>){
    return this.http.put(`http://localhost:3000/api/v1/updatenotes`,notes,{
       headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this._authService.getBearerToken()}`)
    })
  }

  deleteNote(notes:Array<Note>){
    console.log("deleteNote in services",notes);
    return this.http.request<Note>('delete', `http://localhost:3000/api/v1/notes/`, 
    { body: { 
      "notes":notes
     },
       headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this._authService.getBearerToken()}`) 
    });
  }
}
