import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EditlabelviewComponent } from '../editlabelview/editlabelview.component';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-editlabelopen',
  templateUrl: './editlabelopen.component.html',
  styleUrls: ['./editlabelopen.component.css']
})
export class EditlabelopenComponent implements OnInit {

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private notesService: NotesService) { }

  ngOnInit() {
     this.dialog.open(EditlabelviewComponent, { width: '300px',autoFocus: false  })
      .afterClosed()
      .subscribe(result => {
        this.notesService.fetchNotesFromServer();
      });
  }

}
