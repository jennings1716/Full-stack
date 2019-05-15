declare var require: any; 
const uuidv1 = require('uuid/v1');

export class Label{
    userId:string//String;
    labelId:string//String;
    labelName:string//String;
    noteIDs:Array<string>//Array<String>;
    constructor(){
        this.labelId = uuidv1();
        this.userId='';
        this.labelName='';
        this.noteIDs=[];
    }
  
}