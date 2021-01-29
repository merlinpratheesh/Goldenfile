import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map, switchMap, startWith, withLatestFrom } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MainSectionGroup, projectControls, UserdataService, userProfile, usrinfoDetails } from './service/userdata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success
    myusrinfoFromDb: null
  };

  myprojectControls: projectControls = {
    projectkeysControl: new FormControl(null, Validators.required),
    publicprojectControl: new FormControl(null, Validators.required),
    userdetailsprojectControl: new FormControl(null, Validators.required)



  }
  myusrinfoDetails: usrinfoDetails = {
    profileName: '',
    email: '',
    gender: '',
    areasOfinterest: '',
    skills: '',
    location: ''
  };

  userinfoDetails : any;
  localuserinfoDetails = [];
  getuserinfoDetailsSubscription: Subscription;
  getuserinfoDetailsBehaviourSub = new BehaviorSubject(undefined);
  getuserinfoDetails = (uid: AngularFirestoreDocument<any>) => {
    if (this.getuserinfoDetailsSubscription !== undefined) {
      this.getuserinfoDetailsSubscription.unsubscribe();
    }
    this.getuserinfoDetailsSubscription = uid.valueChanges().subscribe((val: any) => {
      console.log('val', val);
      if (val === undefined) {
        this.getuserinfoDetailsBehaviourSub.next(undefined);
      } else {
        if (val.uidDetails.length === 0) {
          this.getuserinfoDetailsBehaviourSub.next(null);
        } else {
          this.localuserinfoDetails = val.uidDetails;
          this.getuserinfoDetailsBehaviourSub.next(val.uidDetails);

        }
      }
    });
    return this.getuserinfoDetailsBehaviourSub;
  };

  publicList : any;
  localpublicList = [];
  getPublicListSubscription: Subscription;
  getPublicListBehaviourSub = new BehaviorSubject(undefined);
  getPublicList = (publicProjects: AngularFirestoreDocument<any>) => {
    if (this.getPublicListSubscription !== undefined) {
      this.getPublicListSubscription.unsubscribe();
    }
    this.getPublicListSubscription = publicProjects.valueChanges().subscribe((val: any) => {
      if (val === undefined) {
        this.getPublicListBehaviourSub.next(undefined);
      } else {
        if (val.public.length === 0) {
          this.getPublicListBehaviourSub.next(null);
        } else {
          this.localpublicList = val.public;
          this.getPublicListBehaviourSub.next(val.public);
          console.log(val.public);
        }
      }
    });
    return this.getPublicListBehaviourSub;
  };
  Sections: any;
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
        console.log(val);
        if (val.mainSection.length === 0) {
          this.getSectionsBehaviourSub.next(null);
        } else {
          console.log(val.mainSection)
          if (val.mainSection.length !== 0) {
            this.getSectionsBehaviourSub.next(val.mainSection);
          }
        }
      }
    });
    return this.getSectionsBehaviourSub;
  };

  projectkeys: Subscription;
  publicProjsel: Subscription;
  userinfo:Subscription;
  publicProjectSelected: any;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {

    this.userinfo =this.myprojectControls.userdetailsprojectControl.valueChanges.pipe(
      startWith(''),
      map((ProfileviewSelected: string) => {
        if (!ProfileviewSelected || ProfileviewSelected === '') {
          this.userinfoDetails = this.getuserinfoDetails(this.db.doc(('/profile/uid')));

          return ProfileviewSelected;
        }
      })).subscribe(_ => {
      });

    this.projectkeys = this.myprojectControls.projectkeysControl.valueChanges.pipe(
      startWith(''),
      map((KeySelected: string) => {
        if (!KeySelected || KeySelected === '') {
          this.Sections = this.getSections(this.db.doc(('/projectKeys/keys')));
          return KeySelected;
        }
      })).subscribe(_ => {
      });

    this.publicProjsel = this.myprojectControls.publicprojectControl.valueChanges.pipe(
      startWith(''),
      map((publicProjectSelected: string) => {
        if (!publicProjectSelected || publicProjectSelected === '') {
          this.getPublicListSubscription?.unsubscribe();
          this.publicList = this.getPublicList(this.db.doc(('/projectList/publicProjects')));
          this.userinfoDetails.uid=this.publicProjectSelected.projectsUid;
          this.Sections.keys=this.publicProjectSelected.ProjectName;

          return publicProjectSelected;
        }
      })).subscribe(_ => {
      });
  }

  ngOnDestroy() {
    this.userinfo.unsubscribe();
    this.publicProjsel.unsubscribe();
    this.projectkeys.unsubscribe();
    this.getuserinfoDetailsSubscription?.unsubscribe()
    this.getPublicListSubscription?.unsubscribe();
    this.getSectionsBehaviourSub?.unsubscribe();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.localpublicList, event.previousIndex, event.currentIndex);
  }
}