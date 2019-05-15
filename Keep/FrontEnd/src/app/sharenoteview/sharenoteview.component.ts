import { Component, Inject, HostListener,ElementRef,Input,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NotesService} from '../services/notes.service';
import {RouterService} from '../services/router.service';
import { Router,ActivatedRoute,RouterState } from '@angular/router';
import {Label} from '../labels';
import {Note} from '../note';
import {LabelsService} from '../services/labels.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-sharenoteview',
  templateUrl: './sharenoteview.component.html',
  styleUrls: ['./sharenoteview.component.css']
})
export class SharenoteviewComponent implements OnInit {
  public text: string;
  selectedNotes:Array<Note>=[];
  receivers:Array<string>=[];
  receiver_name:string;
  allusers={}
   @HostListener('document:click',['$event'])
    clickout(event) {
      if(this.eRef.nativeElement.contains(event.target)) {
        this.text = "clicked inside";
        console.log("this.text",this.text)
      } else {
        this.text = "clicked outside";
        console.log("this.text",this.text)
        this.router.navigate(['dashboard']);
      }
    }
  constructor( private _authService: AuthenticationService,public dialogRef: MatDialogRef<SharenoteviewComponent>, @Inject(MAT_DIALOG_DATA) public title: string,private noteService: NotesService,
  private routerService: RouterService, private labelsService: LabelsService,private eRef: ElementRef,private router:Router) { }

  ngOnInit() {
    this.selectedNotes = this.noteService.selectedNotes;
    this._authService.getAllUsers().subscribe(data=>{
     data["users"].forEach(user=>{
       this.allusers[user["username"]]=user._id;
     })
    },
    err=>{
      console.log("err",err);
    })
  }

  removeChip(i){
    this.selectedNotes.splice(i,1);
    if(this.selectedNotes.length<=0){
       this.router.navigate(['dashboard']);
       this.dialogRef.close()
    }
  }

  delete_receiver(i){
    this.receivers.splice(i);
  }

  add_receiver(){
    this.receivers.push(this.receiver_name);
    this.receiver_name="";
  }

  share_notes(){
    console.log("receivers",this.receivers);
    console.log("All users",this.allusers);
    let receiver_ids=[]
    let note_titles = []
    let sender_name = ""
    this.selectedNotes.forEach(sNote=>{
      note_titles.push(sNote.title)
      this.receivers.forEach(receiver=>{
        if(this.allusers[receiver]){ // && this.allusers[receiver]!=localStorage.getItem("userId")
          if(sNote.sharedTo.indexOf(this.allusers[receiver])<0){
             sNote.sharedTo.push(this.allusers[receiver])
            
          }
          if(receiver_ids.indexOf(this.allusers[receiver])<0){
             receiver_ids.push(this.allusers[receiver])
          }
        }
      })
      Object.keys(this.allusers).forEach(user=>{
        if(this.allusers[user]==localStorage.getItem("userId")){
          sender_name = user
        }
      })
      sNote.reminder=null
      sNote.reminder_job=null
      sNote.favorite = false
    })
    console.log("receiver_ids",receiver_ids)
    console.log("notes",this.selectedNotes);
    var message = sender_name+" shared you "+note_titles.join(",")
    // this.noteService.shareNotes(receiver_ids,message)
    // this.dialogRef.close()
    this.noteService.updateMultipleNotes(this.selectedNotes).subscribe(data=>{
      console.log("updated successfully")
      this.noteService.shareNotes(receiver_ids,message)
      this.dialogRef.close()
      
    },
    err=>{
      console.log("Error");
    })
  }

}
