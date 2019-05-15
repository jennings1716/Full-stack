import { Component, Inject, HostListener,ElementRef,Input,OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NotesService} from '../services/notes.service';
import {RouterService} from '../services/router.service';
import { Router,ActivatedRoute,RouterState } from '@angular/router';
import {Label} from '../labels';
import {LabelsService} from '../services/labels.service';


@Component({
  selector: 'app-editlabelview',
  templateUrl: './editlabelview.component.html',
  styleUrls: ['./editlabelview.component.css']
})
export class EditlabelviewComponent implements OnInit {
  public text: string;
  public editSelect:Boolean = false;
  public label_text:string;
  label:Label = new Label();
  focus:Boolean = false;
  errMessage:string;
  totalLabels:Array<Label>=[]
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
  constructor(public dialogRef: MatDialogRef<EditlabelviewComponent>, @Inject(MAT_DIALOG_DATA) public title: string,private noteService: NotesService,
  private routerService: RouterService, private labelsService: LabelsService,private eRef: ElementRef,private router:Router) { }

  ngOnInit() {
    this.labelsService.getTotalLabelsSubject().subscribe(res=>{
      this.totalLabels= res;
      console.log("Total Labels",this.totalLabels)
    },
    err=>{
      console.log("Err",err)
    })
  }

  add_label(){
    if(this.label_text==''){
      this.errMessage = "Label name should not be empty";
    }else{
      this.label["userId"] = this.noteService.getUserId();
      this.label["labelName"] = this.label_text;
      this.label_text=''
      this.labelsService.addLabel(this.label).subscribe(
        res=>{
          console.log("successfully added label",res)
          this.totalLabels.push(res["label"])
          this.label = new Label();
        },
        err=>{
          console.log("Error in adding label",err)
        }
        
      )
    }
  }

  delete_label(labelId){
    console.log("DELETING LABEL",labelId)
    var i=0
    this.labelsService.deleteLabel(labelId).subscribe(
      res=>{
        this.totalLabels.forEach(tlabel=>{
          if(tlabel.labelId==labelId){
            this.totalLabels.splice(i,1)
            this.labelsService.setTotalLabels(this.totalLabels)
            console.log("this.totalLabels",this.totalLabels)
          }
          i+=1
        })

      },
      err=>{
        console.log("Err in deleting note",err)
      }
    )
  }



}
