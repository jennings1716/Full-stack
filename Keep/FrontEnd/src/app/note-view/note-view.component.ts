import { Component, EventEmitter, Output} from '@angular/core';
import {Note} from '../note';
import { NotesService } from '../services/notes.service';
import { Observable } from 'rxjs/Observable';
import { RouterService } from '../services/router.service';
import { MatCheckbox } from '@angular/material';
import * as schedule from 'node-schedule';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent  {
  constructor(private notesService: NotesService,private routerService:RouterService){}
  public errMessage: string;
  notes: Array<Note>=[];
  selectedNotes:Array<Note>=[];
  checkNotes:boolean = false;
  selected:Array<boolean>=[];
  reminderTitle:string='';
  displayReminders:Array<string> = []
  reminderJobs:Array<string>=[];
  notification_message:string="";

  ngOnInit(){
      // GETTING SELECTED NOTES
      this.notesService.getSelectedNotes().subscribe(
        res=>{
          if(res.length==0){
            this.selected = []
            this.selectedNotes = []
            this.checkNotes = false
          }
        },
        err=>{
          console.log("Error in selected notes",err)
      })
      
      if(this.selected.length>0){
        this.checkNotes= true
      }else{
        this.checkNotes= false
      }
      // REMINDER SECTION
      this.notesService.getNotes().subscribe(
        (data) => {
          var i=0
          this.selected = []
          this.selectedNotes = []
          this.checkNotes = false;
          this.notes = data;
          // Set reminder count
          this.notesService.getDisplayReminderTitles().subscribe(data=>{
            this.displayReminders = data;
            },err=>{
          })
          // SET REMINDERS WHEN PAGE REFRESHED
          this.notes.forEach(note=>{
              if(note.reminder_job){
                console.log("note.reminder_job",note.reminder_job)
                if(schedule.scheduledJobs[note.reminder_job]){
                  // let job_c = schedule.scheduledJobs[note.reminder_job]
                  // job_c.cancel()
                  console.log("Reminder at",new Date(note.reminder));
                  console.log("JOB presents")
                }else{
                  console.log("JOB EXPIRED");
                  let current = new Date(Date.now())
                  let remind_time = new Date(note.reminder)
                  var start_time = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), 0);
                  var before_15 = new Date(remind_time.getFullYear(), remind_time.getMonth(), remind_time.getDate(), remind_time.getHours(), remind_time.getMinutes()-1, 0);
                  var end_time = new Date(remind_time.getFullYear(), remind_time.getMonth(), remind_time.getDate(), remind_time.getHours(), remind_time.getMinutes(), 0);
                  var reminder_title=note.title
                  if(current.getTime()<remind_time.getTime()){
                    var job = schedule.scheduleJob({ start: start_time, end: end_time, rule: '*/1 * * * *' }, ()=>{
                        let time_now = new Date(Date.now())
                        if(time_now.toString()==before_15.toString()){
                          if(this.displayReminders.indexOf(reminder_title)<0){
                              this.displayReminders.push(reminder_title)
                              this.notesService.setDisplayReminderTitles(this.displayReminders);
                          }
                          console.log("ALERT for note before 15",reminder_title)
                        }
                        if(time_now.toString()==end_time.toString()){
                          if(this.displayReminders.indexOf(reminder_title)<0){
                              this.displayReminders.push(reminder_title);
                              this.notesService.setDisplayReminderTitles(this.displayReminders);
                              job.cancel();
                          }
                          note.reminder=null;
                          note.reminder_job=null;
                          this.notesService.editNote(note).subscribe(data=>{
                            },err=>{
                              console.log("Reminder error")
                            })

                          }
                    })
                  }
                  console.log("this.remindertime",new Date(note.reminder));
                }
              }
            })
          }, 
          (err) => {
            this.errMessage = 'HttpErrorResponse: ' +err.message;
            return Observable.throw(this.errMessage);
      });
      // NOTIFICATION MESSAGE
      this.notesService.notificationSubject.subscribe(
        data=>{
          if(data){
            this.notification_message = data;  
          }
        },
        err=>{
          console.log("Error in receiving notification",err);
      })
      
  }

  editNote(noteId) {
      this.routerService.routeToEditNoteView(noteId);
  }

  selection(event,selectedNote,id){ 
    if(this.selected[id]==undefined||this.selected[id]==false){
      this.selected[id]=true
      this.selectedNotes.push(selectedNote)
      if(this.selected.length>0){
        this.checkNotes= true
      }else{
        this.checkNotes= false
      }
      this.notesService.setSelectedNotes(this.selectedNotes)
      console.log("this.selectedNotes after push",this.selectedNotes)
    }else{
      var i=0
      this.selected[id]=false
      this.selectedNotes.forEach(selNote=>{
        if(selNote.noteId==selectedNote.noteId){
          this.selectedNotes.splice(i,1)
          if(this.selectedNotes.length ==0){
            this.selected=[]
            if(this.selected.length>0){
              this.checkNotes= true
            }else{
              this.checkNotes= false;
            }
          }
          this.notesService.setSelectedNotes(this.selectedNotes);
        }
        i+=1;
      })
      console.log("this.selectedNotes after pop",this.selectedNotes)
    }
  }
  
  close_remindernote(i,title){
    console.log("index",i)
    console.log("index",i)
    var j=0
    this.displayReminders.forEach(disp=>{
      if(disp==title){
        this.displayReminders.splice(j,1);
        
      }
      j+=1
    })
    console.log("this.displayReminders after close",this.displayReminders)
  }

  close_notification(){
    this.notesService.notificationSubject.next("");
    this.notification_message="";
  }

  snooze_reminder(note_title,i){
    console.log("schedule.scheduledJobs",schedule.scheduledJobs)
    this.displayReminders.splice(i,1);
    this.notes.forEach(n=>{
      if(n.title==note_title){
        if(schedule.scheduledJobs[n.reminder_job]){
            var my_job =schedule.scheduledJobs[n.reminder_job];
            my_job.cancel()
          }
          var org_time = new Date(n.reminder);
          let current = new Date(Date.now())
          var start_time = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), 0);
          var before_15 = new Date(org_time.getFullYear(), org_time.getMonth(), org_time.getDate(), org_time.getHours(), org_time.getMinutes()+1, 0);
          var end_time = new Date(org_time.getFullYear(), org_time.getMonth(), org_time.getDate(), org_time.getHours(), org_time.getMinutes()+2, 0);
          var reminder_note= n;
          if(current.getTime()<end_time.getTime()){
            var job = schedule.scheduleJob({ start: start_time, end: end_time, rule: '*/1 * * * *' }, ()=>{
                let time_now = new Date(Date.now())
                if(time_now.toString()==before_15.toString()){
                  console.log("this.note.title",reminder_note.title)
                  if(this.displayReminders.indexOf(reminder_note.title)<0){
                    this.displayReminders.push(reminder_note.title)
                    this.notesService.setDisplayReminderTitles(this.displayReminders);
                  }     
                }
                if(time_now.toString()==end_time.toString()){
                  if(this.displayReminders.indexOf(reminder_note.title)<0){
                    this.displayReminders.push(reminder_note.title);
                    this.notesService.setDisplayReminderTitles(this.displayReminders);
                  }
                  job.cancel();
                  console.log("ALERT for note at end",reminder_note.title)
                  reminder_note.reminder=null;
                  reminder_note.reminder_job=null;
                  this.notesService.editNote(reminder_note).subscribe(data=>{
                    console.log("Reminder cancelled for note",reminder_note.title)
                  },err=>{
                    console.log("Reminder error")
                  })
                }
            })
            n.reminder_job = job.name;
          }
        // sessionStorage.setItem("note",JSON.stringify(n))
        n.reminder = end_time
        console.log(" n.reminder_job", n.reminder_job)
        this.notesService.editNote(n).subscribe(data => {
            this.notification_message="";
          },
          err => {
            this.errMessage = err.message;
          });
        }
    })
  }

  dismiss_reminder(reminder_note,i){
    console.log("schedule.scheduledJobs",schedule.scheduledJobs)
    this.notes.forEach(n=>{
      if(n.title==reminder_note){
         if(schedule.scheduledJobs[n.reminder_job]){
          var my_job =schedule.scheduledJobs[n.reminder_job];
          console.log("my_job",my_job)
          my_job.cancel();
         }
         console.log("note",n)
         console.log("n.reminder_job",n.reminder_job);
         this.displayReminders.splice(i,1)
         this.notesService.setDisplayReminderTitles(this.displayReminders);
         n.reminder=null;
         n.reminder_job=null;
         
         this.notesService.editNote(n).subscribe(data=>{
          console.log("Reminder cancelled for note",n.title)
          this.notification_message="";
         },err=>{
           console.log("Reminder error")
         })
      }
    })
  }
    
}
