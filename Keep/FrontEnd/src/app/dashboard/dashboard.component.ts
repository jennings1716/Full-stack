import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../note';
import {NotesService} from '../services/notes.service';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterService } from '../services/router.service';
import {LabelsService} from '../services/labels.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
      public errMessage: string;
      notification:boolean = true;
      constructor(private notesService: NotesService, private routerService:RouterService,private labelService:LabelsService){
            this.notesService.fetchNotesFromServer();
      }
      note: Note = new Note();
      notes: Array<Note> = [];
      ngOnInit(){
            console.log("ngOnInit in dashboard")
            this.notesService.fetchNotesFromServer();
            this.labelService.getLabels();
      }
      ngOnChanges(){
            this.notesService.fetchNotesFromServer();  
      }


}
