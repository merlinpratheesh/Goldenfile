import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { docData } from 'rxfire/firestore';
import {of ,Observable, Subscription, BehaviorSubject} from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { MainSectionGroup, projectDetails, UserdataService, userProfile } from './service/userdata.service';
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
  Sections = of(undefined);
  getSectionsSubscription: Subscription;
  getSectionsBehaviourSub = new BehaviorSubject(undefined);
  getSections = (MainAndSubSectionkeys: AngularFirestoreDocument<MainSectionGroup>) => {
    if (this.getSectionsSubscription !== undefined) {
      this.getSectionsSubscription.unsubscribe();
    }
    this.getSectionsSubscription = MainAndSubSectionkeys.valueChanges().subscribe((val: any) => {
      if (val === undefined) {
        this.getSectionsBehaviourSub.next(undefined);
      } else {
        if (val.MainSection.length === 0) {
          this.getSectionsBehaviourSub.next(null);
        } else {
          if (val.MainSection.length !== 0) {
            this.getSectionsBehaviourSub.next(val.MainSection);
          }
        }
      }
    });
    return this.getSectionsBehaviourSub;
  };

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

  ref;
  keyref = this.getSections((this.db.doc('projectKey/' + 'React')));
  someinfodetails:something={
    profileinfo:undefined,
    key: undefined
  };
  profileinfoupdated: any;
  keyinfoupadted: Observable<any>=of(undefined);
  mysub:Subscription;
  userselectedProject='SHOW';
  projctDetails(some) {
    this.userselectedProject=some.keyref;
    console.log(some.keyref);
  this.ref = this.db.firestore.doc('profile/' + some.ref);
  
  this.getSectionsSubscription?.unsubscribe();
  this.keyref = this.getSections((this.db.doc('projectKey/' + some.keyref)));
   this.mysub=docData(this.ref).pipe(
    withLatestFrom(this.keyref),
    map((values: any) => {
      const [profileinfo, keyinfo] = values;
      this.profileinfoupdated=profileinfo.profileMoreinfo;
      console.log(keyinfo);
      this.keyinfoupadted=keyinfo;
    })).subscribe(success=>{

    });
}
ngOnDestroy(){
  this.mysub.unsubscribe();
}
}