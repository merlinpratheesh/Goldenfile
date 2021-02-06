import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { docData } from 'rxfire/firestore';
import {of ,Observable, Subscription, BehaviorSubject} from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { MainSectionGroup, projectDetails, UserdataService, userProfile, usrinfoDetails } from './service/userdata.service';
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

  Profiles = of(undefined);
  getProfilesSubscription: Subscription;
  getProfilesBehaviourSub = new BehaviorSubject(undefined);
  getProfiles = (profileDetails: AngularFirestoreDocument<usrinfoDetails>) => {
    if (this.getProfilesSubscription !== undefined) {
      this.getProfilesSubscription.unsubscribe();
    }
    this.getProfilesSubscription = profileDetails.valueChanges().subscribe((val: any) => {
      if (val === undefined) {
        this.getProfilesBehaviourSub.next(undefined);
      } else {
        if (val.profileMoreinfo.length === 0) {
          this.getProfilesBehaviourSub.next(null);
        } else {
          if (val.profileMoreinfo.length !== 0) {
            this.getProfilesBehaviourSub.next(val.profileMoreinfo);
          }
        }
      }
    });
    return this.getProfilesBehaviourSub;
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

  profileRef;
  keyRef = this.getSections((this.db.doc('projectKey/' + 'DefaultProject')));
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
  this.profileRef = this.getProfiles((this.db.doc('profile/' + some.profileRef)));
  
  this.getSectionsSubscription?.unsubscribe();
  this.keyRef = this.getSections((this.db.doc('projectKey/' + some.keyref)));
}
ngOnDestroy(){
  this.mysub.unsubscribe();
}
}