import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

export interface projectControls {
  publicprojectControl?: FormControl;//1-User selects a public project    
  projectkeysControl?:FormControl;
  userdetailsprojectControl?:FormControl;

}
export interface userProfile {
  userAuthenObj: firebase.User,
  
}

export interface SubSection {
  viewvalue: string;
}

export interface MainSectionGroup {
  disabled: boolean;
  name: string;
  section: SubSection[];
}
export interface myusrinfo {
  MembershipEnd: Date;
  MembershipType: string;
  projectLocation: string;
  projectName: string;
  projectOwner: boolean;
}
export interface userProfile {
  userAuthenObj: firebase.User,
  myusrinfoFromDb: myusrinfo
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

  constructor( private db: AngularFirestore) {
 
   }


}
