import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { docData } from 'rxfire/firestore';
import {of ,Observable, Subscription} from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { projectDetails, UserdataService, userProfile } from './service/userdata.service';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService} from 'firebaseui-angular';
import {AngularFireAuth} from '@angular/fire/auth';

export interface something{
  profileinfo: any;
  key:any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  title = 'Goldenfile';
  profile:any;
  key:any;
  constructor(public developmentservice: UserdataService, private db: AngularFirestore, private afAuth: AngularFireAuth, private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService) 
  {
    firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  }
  ngOnInit(): void {
    //this.afAuth.authState.subscribe(d => console.log(d));
  }
  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);

  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }

  uiShownCallback() {
    console.log('UI shown');
  }
  
  logout() {
    this.afAuth.signOut();
  }

  uid = 'uid';
  projectname = 'keys';
  ref;
  keyref;
  someinfodetails:something={
    profileinfo:undefined,
    key: undefined
  };
  profileinfoupdated: any;
  keyinfoupadted: any;
  mysub:Subscription;
  projctDetails(some) {
  this.ref = this.db.firestore.doc('profile/' + some.ref);
  this.keyref = this.db.firestore.doc('projectKeys/' + some.keyref);

   this.mysub=docData(this.ref).pipe(
    withLatestFrom(docData(this.keyref)),
    map((values: any) => {
      const [profileinfo, keyinfo] = values;
      this.profileinfoupdated=profileinfo.uidDetails;
      this.keyinfoupadted=keyinfo.mainSection;
    })).subscribe(success=>{

    });
}
ngOnDestroy(){
  this.mysub.unsubscribe();
}
}