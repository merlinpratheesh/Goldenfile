import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import { projectControls, UserdataService, usrinfoDetails } from '../service/userdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy  {

  myusrinfoDetails: usrinfoDetails = {
    profileName: '',
    email: '',
    gender: '',
    areasOfinterest: '',
    skills: '',
    location: ''
  };
  myprojectControls: projectControls = {

    userdetailsprojectControl: new FormControl(null, Validators.required)
  }

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
  userinfo: Subscription;
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
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.userinfo.unsubscribe();
 
    this.getuserinfoDetailsSubscription?.unsubscribe()

  }

}
