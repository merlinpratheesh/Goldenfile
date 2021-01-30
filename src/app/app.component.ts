import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { docData } from 'rxfire/firestore';
import {of ,Observable} from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { projectControls, projectDetails, UserdataService, userProfile } from './service/userdata.service';

export interface something{
  profileinfo: string;
  key:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Goldenfile';
  profile:any;
  key:any;
  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {}

  uid = 'uid';
  projectname = 'keys';
  ref;
  keyref;
  
  mydata:Observable<something>=of({profileinfo:null, key:null });

  projctDetails(some) {
  console.log('28',some);
  
  this.ref = this.db.firestore.doc('profile/' + some.ref);
  this.keyref = this.db.firestore.doc('projectKeys/' + some.keyref);

  this.mydata = docData(this.ref).pipe(
    withLatestFrom(docData(this.keyref)),
    map((values: any) => {
      const [profileinfo, keyinfo] = values;
    


      return {
        profileinfo: profileinfo.uidDetails,
        key: keyinfo.mainSection
      }

    }));
}
}