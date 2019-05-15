import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor(public router: Router, private location: Location) { }
  title;
  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeToEditNoteView(noteId) {
    console.log("title in service",noteId)
    // this.title =title;
    this.router.navigate(['dashboard', {outlets: {noteEditOutlet: [ 'note', noteId, 'edit' ]}}]);
  }

  routeBack() {
    this.location.back()
  }

  routeToNoteView() {
    this.router.navigate(['dashboard/view/noteview'])
  }

  routeToListView() {
    this.router.navigate(['dashboard/view/listview'])
  }

  routeToEditLabel(){
    this.router.navigate(['dashboard/view/editlabels'])
  }

  routeToShareNote(){
    this.router.navigate(['dashboard/view/shareNotes'])
  }
}
