import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../note';
import {NotesService} from '../services/notes.service';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import {NoteViewComponent} from '../note-view/note-view.component'

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  public errMessage: string;
  note: Note = new Note();
  constructor(private notesService: NotesService){}
    
  takeNotes(){
         if (this.note.title === '' || this.note.text === '') {
            this.errMessage = 'Title and Text both are required fields';
            return Observable.throw(this.errMessage);
         }else{
           this.note.userId = this.notesService.getUserId()
            this.notesService.addNote(this.note).subscribe(
            res => {
              console.log("added note to server",res);
              this.notesService.fetchNotesFromServer();
            },
            err => {
              this.errMessage = err.message;
            }
          );
          this.note = new Note();
        }
  }

  toggle(event){
    this.note.favorite = event.checked
  }

}
