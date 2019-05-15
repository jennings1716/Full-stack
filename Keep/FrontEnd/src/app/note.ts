declare var require: any; 
const uuidv1 = require('uuid/v1');

export class Note {
  userId:string//String;
  noteId: string//String;
  title: string;
  text: string;
  state: string;
  favorite:boolean;
  labels:Array<string>;
  reminder:Date;
  reminder_job:Object;
  sharedTo:Array<string>;
  constructor() {
    this.userId='';
    this.noteId=uuidv1();
    this.title = '';
    this.text = '';
    this.state = 'not-started';
    this.favorite = false;
    this.labels=[];
    this.reminder=null;
    this.reminder_job = null;
    this.sharedTo = [];
  }
}
