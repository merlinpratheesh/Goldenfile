import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import { projectControls, projectDetails, UserdataService, usrinfoDetails } from '../service/userdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy  {

  @Input() profile: usrinfoDetails;
  @Input() ref: projectDetails ;

  myusrinfoDetails : usrinfoDetails = {
    profileName:'',
    email: '',
    gender:'',
    areaOfinterest:'',
    skills: '',
    location:''
  }

  myprojectDetails: projectDetails = {
    projectName: '',//Heading in testcase list
    description:'',//Sub-Heading in testcase list
    photoUrl: '',//Description in testcase view
    projectsUid: ''//stackblitzLink in testcase edit/doubleclick
  }

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
  constructor(public developmentservice: UserdataService, private db: AngularFirestore) { 

    
          this.userinfoDetails = this.getuserinfoDetails(this.db.doc(('/profile/'+this.ref)));

     
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
 
    this.getuserinfoDetailsSubscription?.unsubscribe()

  }

}
