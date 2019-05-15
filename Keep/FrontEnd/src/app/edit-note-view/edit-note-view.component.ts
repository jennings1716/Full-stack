import {Component, EventEmitter, Output,Inject, HostListener,ElementRef,Input,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Note} from '../note';
import {NotesService} from '../services/notes.service';
import {RouterService} from '../services/router.service';
import { Router,ActivatedRoute,RouterState } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as schedule from 'node-schedule';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit{
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  public text: String;
  public urlpath:string;
  public noteId:string;
  check:boolean=false;
  options: FormGroup;
  displayReminder:boolean=false;
  public dateTime: Date;
  reminderSet:boolean;
  displayReminderTitles:Array<string> = []
  @HostListener('document:click',['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.text = "clicked inside";
      console.log("this.text",this.text)
    } else {
      this.text = "clicked outside";
      let active_url= this.router.routerState.snapshot.url
      let return_view = active_url.split("/")
      if(return_view[3]=="listview"){
        this.router.navigateByUrl('/dashboard/view/listview');
      }else{
        this.router.navigateByUrl('/dashboard/view/noteview');
      }
      
    }
  }

  constructor(fb: FormBuilder,public dialogRef: MatDialogRef <EditNoteViewComponent>, @Inject(MAT_DIALOG_DATA) public title: String,private noteService: NotesService,
  private routerService: RouterService, private eRef: ElementRef,private router:Router) {
  } 

  ngOnInit() {
    this.urlpath = this.router.routerState.snapshot.url;
    this.noteId = this.urlpath.split("/")[6]
    this.note = this.noteService.getNoteById(this.noteId)
  }

  displayReminderMenu(){
    console.log("Reminder menu",this.displayReminder)
    if(this.displayReminder){
      this.displayReminder = false;
    }else{
      this.displayReminder = true;
    }
  }

  onSave() {
    console.log("this.note on save",this.note)
    this.errMessage = '';
    this.router.navigate(['dashboard']);
    this.dialogRef.close();
    if(this.reminderSet){
      if(this.note.reminder_job){
        console.log("schedule.scheduledJobs",schedule.scheduledJobs)
        if(schedule.scheduledJobs[this.note.reminder_job]){
          console.log("Already job running");
          schedule.scheduledJobs[this.note.reminder_job].cancel();
          console.log("previous job cancelled");
        }
      }
      let current = new Date(Date.now())
      let remind_time = new Date(this.note.reminder);
      var start_time = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), 0);
      var before_15 = new Date(remind_time.getFullYear(), remind_time.getMonth(), remind_time.getDate(), remind_time.getHours(), remind_time.getMinutes()-1, 0);
      var end_time = new Date(remind_time.getFullYear(), remind_time.getMonth(), remind_time.getDate(), remind_time.getHours(), remind_time.getMinutes(), 0);
      var reminder_note= this.note
      if(current.getTime()<remind_time.getTime()){
         var job = schedule.scheduleJob({ start: start_time, end: end_time, rule: '*/1 * * * *' }, ()=>{
            let time_now = new Date(Date.now())
            console.log("schedule started");
            if(time_now.toString()==before_15.toString()){
              console.log("this.note.title",reminder_note.title)
              this.displayReminderTitles.push(reminder_note.title)
              console.log("this.displayReminderTitles",this.displayReminderTitles);
              this.noteService.setDisplayReminderTitles(this.displayReminderTitles);
              console.log("ALERT for note before 15",reminder_note.title)
              console.log("scheduledJobs before 15",schedule.scheduledJobs);
            }
            if(time_now.toString()==end_time.toString()){
              this.displayReminderTitles.push(reminder_note.title);
              this.noteService.setDisplayReminderTitles(this.displayReminderTitles);
              job.cancel();
              console.log("ALERT for note at end",reminder_note.title)
              console.log("scheduledJobs at end time",schedule.scheduledJobs);
              reminder_note.reminder=null;
              reminder_note.reminder_job=null;
              this.noteService.editNote(reminder_note).subscribe(data=>{
                console.log("Reminder cancelled for note",reminder_note.title)
              },err=>{
                console.log("Reminder error")
              })
            }
         })
         this.note.reminder_job = job.name;
      }
    }
    this.noteService.editNote(this.note).subscribe(data => {
      this.note = new Note();
      },
      err => {
        this.errMessage = err.message;
      });
  }

  toggle(event){
    this.note.favorite = event.checked
    
  }

  setReminder(note:Note){
    console.log("Reminder set at",note)
    this.reminderSet=true
  }
}
