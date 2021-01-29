import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map, switchMap, startWith, withLatestFrom } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { projectControls, UserdataService, userProfile, usrinfoDetails } from './service/userdata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {


  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success

  };

  myprojectControls: projectControls = {
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


  userinfoDetails = of(undefined);
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
  userinfo: Subscription;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore) { 


    this.userinfo = this.myprojectControls.userdetailsprojectControl.valueChanges.pipe(
      startWith(''),
      map((ProfileviewSelected: string) => {
        if (!ProfileviewSelected || ProfileviewSelected === '') {
          this.localuserinfoDetails = [];
          this.getuserinfoDetailsSubscription?.unsubscribe();
          this.userinfoDetails = this.getuserinfoDetails(this.db.doc(('/profile/uid')));
          console.log(this.userinfoDetails);

          return ProfileviewSelected;
        }
        })).subscribe(_ => {

        });
  }

  ngOnDestroy() {
    this.userinfo.unsubscribe();
    this.getuserinfoDetailsSubscription?.unsubscribe();
  }

}
