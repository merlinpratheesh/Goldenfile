import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

export interface projectControls {
  publicprojectControl?: FormControl;//1-User selects a public project    
  userdetailsprojectControl?:FormControl;
}
export interface userProfile {
  userAuthenObj: firebase.User,
  
}

export interface usrinfoDetails {
  profileName: string,
  email: string,
  gender:string,
  areasOfinterest:string,
  skills: string,
  location:string
}


@Injectable({
  providedIn: 'root'
})

export class UserdataService {

 


  constructor() {
 
   }
}
