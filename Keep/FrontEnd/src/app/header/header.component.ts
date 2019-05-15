import { Component,OnChanges, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';
import {NotesService} from '../services/notes.service';
import {AuthenticationService} from '../services/authentication.service'
import {Note} from '../note';
import { Observable } from 'rxjs/Observable';
import {NoteViewComponent} from '../note-view/note-view.component';
import {LabelsService} from '../services/labels.service';
import {Label} from '../labels';
import { MatCheckbox } from "@angular/material";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  isChecked:boolean;
  isNoteView = true;
  isSearch;
  searchStr:string;
  notes: Array<Note>;
  errMessage:string;
  searchNotes: Array<Note> = [];
  favoriteNotes: Array<Note> = [];
  tNotes: Array<Note> = [];
  errSearch:any;
  myFavorites:boolean=false;
  displayselectBar:boolean=false;
  menuSelected:boolean=false;
  changeLabelMenu:boolean = false;
  receivedLabels:Array<Label>;
  selectedLabels:Array<Label>=[];
  labelStatus:Array<boolean>=[];
  indeterminate:Array<boolean>=[];
  selNotes:Array<Note>=[];
  serverSent:boolean=false;
  loginStatus:boolean;
  constructor( private router: Router,private authenticationService:AuthenticationService, private routerService: RouterService,private notesService:NotesService,private labelService:LabelsService) {
}

  ngOnInit(){
    this.authenticationService.getLoggedin().subscribe(data=>{
        if(localStorage.getItem("loggedin") && data){
          this.isSearch = true;
        }else{
          this.isSearch = false;
        }
    },
    err=>{
      console.log("header login",err);
    })

    // this.notesService.getNotes().subscribe(
    //   (data) => {
    //       this.notes = data;
    //   }, 
    //   err => {
    //       this.errMessage = 'HttpErrorResponse: ' +err.message;
    //       return Observable.throw(this.errMessage);
    // });

    // To check if any notes are selected
    this.notesService.getSelectedNotes().subscribe(
        res=>{
          if(res.length>0){
            this.displayselectBar=true
            this.menuSelected=false
            this.changeLabelMenu = false;
          }else{
            this.selectedLabels=[]
            this.labelStatus=[]
            this.selNotes=[]
            this.displayselectBar=false
          }
        },
        err=>{
          console.log("selectedNoteslength err",err)
    });
    // listview or noteview
    if (this.router.url === 'dashboard/view/listview') {
      this.isNoteView = false;
    }else{
       this.isNoteView = true;
    }
  }


  routeSet(view: string): void {
    if (view === 'list'){
        this.routerService.routeToListView();
        this.isNoteView = false;
    }else{
        this.routerService.routeToNoteView();
        this.isNoteView = true;
    }
  }

  onSearch(){
      var data = this.notesService.getTotalNotes(); 
      if(this.searchStr!=''){
        this.searchNotes=[]
        this.tNotes = data
        var result = data.find(note=>{
          return note.title==this.searchStr
        })
        if(result){
          this.searchNotes.push(result)
          this.notesService.searchingNotes(this.searchNotes)
          this.errSearch=false
          this.searchStr="";
        }else{
          alert("Note not found");
          this.searchStr="";
        }
      }else{
        this.errSearch=false
        this.notesService.searchingNotes(this.tNotes)
      }
  }

  my_favorites(event){
    var data = this.notesService.getTotalNotes();
    if(this.myFavorites){
      this.myFavorites = false
      this.notesService.searchingNotes(this.notesService.getTotalNotes())
    }else{
      this.myFavorites = true
      this.favoriteNotes = []
      this.tNotes = data
      if(this.myFavorites){
        data.forEach(fnote=>{
          if(fnote.favorite){
            this.favoriteNotes.push(fnote)
          }
        })
        if( this.favoriteNotes){
            this.notesService.searchingNotes(this.favoriteNotes)
        }else{
          alert("No Favorites available")
        }
          console.log("result",this.favoriteNotes)
      }else{
            this.notesService.searchingNotes(this.notesService.getTotalNotes())
      }
    }
  }

  onLogout(event){
    console.log("logging out")
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("loggedin");
    this.isSearch = false;
    this.routerService.routeToLogin();
  }

  selectedMore(){
    console.log("Selecting more")
    if(this.menuSelected){
      this.menuSelected=false
    }else{
      this.menuSelected=true
      this.changeLabelMenu = false;
      var selNoteIds=[]
      var i=0
      this.notesService.selectedNotes.forEach(selNote=>{
        selNoteIds.push(selNote.noteId)
      })
      console.log("selNoteIds",selNoteIds)
      this.receivedLabels = this.labelService.getTotalLabels()
      console.log("this.receivedLabels",this.receivedLabels)
      this.receivedLabels.forEach(label=>{
        var count=0
        this.selectedLabels.forEach(slabel=>{
          if(slabel.labelName==label.labelName){
            count+=1
          }
        })
        if(count==0){
          if(label.noteIDs.length>0){
            this.selectedLabels.push(label)
          }
        }
      })
      this.receivedLabels.forEach(eachLabel=>{
        i=0
        selNoteIds.forEach(selnoteId=>{
          if(eachLabel.noteIDs.indexOf(selnoteId)>-1){
            i+=1
          }
        })
      
        if(i==selNoteIds.length){
          this.labelStatus[eachLabel.labelId]=true
          this.indeterminate[eachLabel.labelId]=false
        }else if(i==0){
          this.indeterminate[eachLabel.labelId]=false
          this.labelStatus[eachLabel.labelId]=false
        }else{
          this.indeterminate[eachLabel.labelId]=true
          this.labelStatus[eachLabel.labelId]=false
        }
      })
    }
    console.log("this.selectedLabels end of selected more",this.selectedLabels)
  }

  noteDelete(){
    console.log("note delete")
    this.displayselectBar = false;
    this.menuSelected=false
    var selnotes = this.notesService.selectedNotes;
    console.log("selected notes in delete",selnotes);
    this.notesService.deleteNote(selnotes).subscribe(resp=>{
        console.log("notes are deleted in server",resp)
        // this.notesService.deleteSelectedNotes(resp)
        this.notesService.fetchNotesFromServer()
      },
      err=>{
        console.log("error in deletion deleted",err)
      })
  }

  changeLabelOption(){
    if(this.changeLabelMenu){
      this.changeLabelMenu = false;
    }else{
      this.changeLabelMenu = true;
      this.menuSelected = false;
    }
  }

  selectingLabels(event,label,id){
     var selNotes = this.notesService.selectedNotes;
     if(this.labelStatus[id]==undefined||this.labelStatus[id]==false){
      console.log("inside if")
      var count=0
      this.labelStatus[id]=true;
      if(this.selectedLabels.length>0){
        this.selectedLabels.forEach(slabel=>{
          if(slabel.labelName == label.labelName){ 
            count+=1
            selNotes.forEach(sNote=>{
              if(slabel.noteIDs.indexOf(sNote.noteId)==-1){
                console.log("pushing notes")
                slabel.noteIDs.push(sNote.noteId)
              }
            })
          }
        })
        if(count==0){
           selNotes.forEach(sNote=>{
              if(label.noteIDs.indexOf(sNote.noteId)==-1){
                label.noteIDs.push(sNote.noteId)
              }
            })
            this.selectedLabels.push(label);
        }
      }else{
        selNotes.forEach(sNote=>{
              if(label.noteIDs.indexOf(sNote.noteId)==-1){
                label.noteIDs.push(sNote.noteId)
              }
            })
        this.selectedLabels.push(label);
      }
      console.log("this.selectedLabels after push",this.selectedLabels)
     }else{
      var selNoteIDs = []
      this.labelStatus[id]=false;
      selNotes.forEach(note=>{
        selNoteIDs.push(note.noteId)
      })
      this.selectedLabels.forEach(sLabel=>{
        if(sLabel.labelName==label.labelName){
          for(var i=0;i<sLabel.noteIDs.length;i++){
            console.log("sNoteId",sLabel.noteIDs[i])
            if(selNoteIDs.includes(sLabel.noteIDs[i])){
             delete sLabel.noteIDs[i]
            }
          }
          if(this.selectedLabels.length ==0){
                this.selectedLabels=[]
            }
        }
      }) 
         console.log("this.selectedLabels after pop",this.selectedLabels)         
     }
     
  }

  change_labels(){
    // this.selectedLabels = this.labelService.getSelectedLabels()
    console.log("this.selectedLabels in change_labels",this.selectedLabels)
    console.log("this.labelStatus",this.labelStatus)
    this.menuSelected = false;
    this.changeLabelMenu = false;
    this.displayselectBar = false;
    console.log("Final selected labels",this.selectedLabels)
    // works fine
    this.labelService.putLabel(this.selectedLabels).subscribe(res=>{ 
        console.log("res",res)
        // this.notesService.setSelectedNotes([])
        this.notesService.fetchNotesFromServer()
        this.selectedLabels=[]
        this.labelStatus=[]
      },err=>{

      });
    
  }

  returnDashboard(){
    this.notesService.fetchNotesFromServer()
    this.router.navigate(["dashboard"])
  }

  shareNotes(){
    this.displayselectBar = false
    this.routerService.routeToShareNote()
  }

  markFavourites(){
    var selnotes = this.notesService.selectedNotes;
    selnotes.forEach(snote=>{
      snote.favorite=true;
    })
    this.notesService.updateMultipleNotes(selnotes).subscribe(data=>{
      console.log("updated notes")
      this.displayselectBar = false;
      this.menuSelected=false
      this.notesService.setSelectedNotes([]);
      this.notesService.fetchNotesFromServer()
    },err=>{
      console.log("Error",err);
    })
  }

}
