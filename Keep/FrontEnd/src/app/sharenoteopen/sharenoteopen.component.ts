import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SharenoteviewComponent } from '../sharenoteview/sharenoteview.component';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-sharenoteopen',
  templateUrl: './sharenoteopen.component.html',
  styleUrls: ['./sharenoteopen.component.css']
})
export class SharenoteopenComponent implements OnInit {

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private notesService: NotesService) { }

  ngOnInit() {
     this.dialog.open(SharenoteviewComponent, { width: '300px',autoFocus: false  })
      .afterClosed()
      .subscribe(result => {
        this.notesService.fetchNotesFromServer();
      });
  }

}
