import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../note';
import {NotesService} from '../services/notes.service';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterService } from '../services/router.service';
import {LabelsService} from '../services/labels.service';
import {Label} from '../labels';
@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css']
})
export class SidenavigationComponent implements OnInit {

  constructor(private routerService:RouterService,private labelService:LabelsService,private noteService:NotesService) { }
  receivedLabels:Array<Label>;
  receivedNotes:Array<Note>;
  groupedNotes:Array<Note>;
  reminderNotes:Array<Note>=[];
  
  ngOnInit() {
    this.receivedNotes = this.noteService.getTotalNotes()
    
  //  this.displayReminderLabels();
    this.labelService.getTotalLabelsSubject().subscribe(res=>{
        this.receivedLabels = res;
    },
    err=>{
        console.log("Error",err);
    });
  }

  createLabels(){
      this.routerService.routeToEditLabel();
  }

  displayNotes(label:Label){
    this.noteService.setSelectedNotes([])
    this.receivedNotes = this.noteService.getTotalNotes()
    this.groupedNotes=[]
    console.log("this.receivedNotes",this.receivedNotes)
    label.noteIDs.forEach(lNoteId=>{
      this.receivedNotes.forEach(note=>{
        if(note.noteId==lNoteId){
           this.groupedNotes.push(note)
        }
      })
    })
    this.noteService.searchingNotes(this.groupedNotes)
  }

  displayReminderLabels(){
    console.log("calling at reminder dismiss");
    this.noteService.getNotes().subscribe((data)=>{
       this.receivedNotes = data;
       console.log("this.receivedNotes",this.receivedNotes);
        var i=0
        var temp = []
        this.receivedNotes.forEach(note=>{
          if(note.reminder_job){            
            temp.push(note)
            console.log("temp",temp);
          }
          if(i==this.receivedNotes.length-1){
            this.reminderNotes = temp;
          }
          i+=1
        })
    },err=>{})
  }
  
}
