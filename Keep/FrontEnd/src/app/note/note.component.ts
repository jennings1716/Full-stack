import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../note';
import { ListNotesService } from '../services/list-notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {

  @Input() note: Note;
  @Input() i: any;
  @Output() myEvent = new EventEmitter();
  notStartedSelected:Array<boolean>=[];
  startedSelected:Array<boolean>=[];
  completedSelected:Array<boolean>=[];
  selected:Array<boolean>=[]
  constructor(private routerService: RouterService,private listnotesService:ListNotesService) { }
  ngOnInit() {
    // var data = this.listnotesService.getSelectedCheckBox()
    // console.log("selected",data)    
      
  }

  editNote(title: String) {
    console.log("title",title)
    this.routerService.routeToEditNoteView(title);
  }

  selection(event,selectedNote:Note,id){
    
    console.log("note",selectedNote)
    console.log("id",id)
    // if(selectedNote.state=="not-started"){
    //   this.notStartedSelected[id]=true
    //   console.log("notStartedSelected",this.notStartedSelected)
    // }else if(selectedNote.state=="started"){
    //   this.startedSelected[id]=true
    //    console.log("startedSelected",this.startedSelected)
    // }else{
    //    this.completedSelected[id]=true
    //    console.log("completedSelected",this.completedSelected)
    // }
    this.myEvent.emit()
  }
}
