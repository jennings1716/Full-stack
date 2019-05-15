import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { NoteComponent } from '../note/note.component';
import { Observable } from 'rxjs/Observable';
import { ListNotesService } from '../services/list-notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  errMessage: string;
  notStartedSelected:Array<boolean>=[];
  startedSelected:Array<boolean>=[];
  completedSelected:Array<boolean>=[];
  selectedNotes:Array<Note>=[];
  notification_message:string="";
  constructor(private notesService: NotesService,private noteService: NotesService,private listnotesService:ListNotesService) {}
  ngOnInit() {
    this.noteService.getNotes()
        .subscribe((data) => {
            this.notStartedNotes = data.filter(i => i.state ==='not-started');
            this.startedNotes = data.filter(i => i.state ==='started');
            this.completedNotes = data.filter(i => i.state ==='completed' );
        }, err => {
              this.errMessage ='HttpErrorResponse: ' + err.message;
              return Observable.throw(this.errMessage);
        });
  }

  selection(note:Note,i){
    if(note.state=='not-started'){
      if(this.notStartedSelected[i]==undefined||this.notStartedSelected[i]==false){
        this.notStartedSelected[i]=true
        this.selectedNotes.push(note)
      }else{
        this.notStartedSelected[i]=false
        var j=0
        this.selectedNotes.forEach(selNote=>{
          if(selNote.noteId==note.noteId){
            this.selectedNotes.splice(j,1)
          }
          j+=1
        })
      }
      
    }else if(note.state=='started'){
      console.log("index",i)
        if(this.startedSelected[i]==undefined||this.startedSelected[i]==false){
          this.startedSelected[i]=true
          this.selectedNotes.push(note)
        }else{
          this.startedSelected[i]=false
          var j=0
          this.selectedNotes.forEach(selNote=>{
            if(selNote.noteId==note.noteId){
              this.selectedNotes.splice(j,1)
            }
            j+=1
          })
        }
    }else{
        if(this.completedSelected[i]==undefined||this.completedSelected[i]==false){
          this.completedSelected[i]=true
          this.selectedNotes.push(note)
        }else{
          this.completedSelected[i]=false
          var j=0
          this.selectedNotes.forEach(selNote=>{
            if(selNote.noteId==note.noteId){
              this.selectedNotes.splice(j,1)
            }
            j+=1
          })
        }
    }
    console.log("notStartedSelected",this.notStartedSelected)
    console.log("startedSelected",this.startedSelected)
    console.log("completedSelected",this.completedSelected)
    // this.listnotesService.setSelectedCheckBox(this.notStartedSelected,this.startedSelected,this.completedSelected)
    this.notesService.setSelectedNotes(this.selectedNotes)
    console.log("this.selectedNotes",this.selectedNotes)
  }

  close_notification(){
    this.notesService.notificationSubject.next("");
    this.notification_message="";
  }
}
