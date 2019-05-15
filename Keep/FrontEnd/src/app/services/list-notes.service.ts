import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';

@Injectable()
export class ListNotesService {
  // notstarted:BehaviorSubject<Array<boolean>>;
  // started:BehaviorSubject<Array<boolean>>;
  // completed:BehaviorSubject<Array<boolean>>;
  selectedCheckboxes:Array<Array<boolean>>=[]
  selectedCheckboxesSubject:BehaviorSubject<Array<Array<boolean>>>;
  constructor() { }
  
  // setSelectedCheckBox(notStartedSelected,startedSelected,completedSelected){
  //   this.selectedCheckboxes=[notStartedSelected,startedSelected,completedSelected]
  //   // this.selectedCheckboxesSubject.next(this.selectedCheckboxes)
  // }

  // getSelectedCheckBox(){
  //   return this.selectedCheckboxes
  // }
}
