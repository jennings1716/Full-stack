import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})

export class EditNoteOpenerComponent implements OnInit {
  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private notesService: NotesService) {
  }

  ngOnInit() {
    console.log("opennner edit note")
    const noteId = +this.activatedRoute.snapshot.paramMap.get('noteId');
    this.dialog.open(EditNoteViewComponent, { width: '250px', data: noteId })
      .afterClosed()
      .subscribe(result => {
        this.notesService.fetchNotesFromServer();
      });
  }

}
