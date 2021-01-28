import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map, switchMap, startWith, withLatestFrom } from 'rxjs/operators';
import { projectControls, UserdataService, userProfile, usrinfoDetails } from '../service/userdata.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ChangeDetectionStrategy} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class ProfileviewComponent implements OnInit,AfterViewInit,OnDestroy {
  @Input() profileinfoUid: firebase.User;

  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success
    
  };

  myprojectControls: projectControls = {
    userdetailsprojectControl: new FormControl(null, Validators.required)

  }
  myusrinfoDetails:usrinfoDetails={
    profilename: '',
    email: '',
    gender:'',
    areasOfInterest: '',
    skills: '',
    location:''
  };
 

  userinfoDetails = of(undefined);
  localuserinfoDetails = [];
  getuserinfoDetailsSubscription: Subscription;
  getuserinfoDetailsBehaviourSub = new BehaviorSubject(undefined);
  getuserinfoDetails = (Profileview: AngularFirestoreDocument<any>) => {
    if (this.getuserinfoDetailsSubscription !== undefined) {
      this.getuserinfoDetailsSubscription.unsubscribe();
    }
    this.getuserinfoDetailsSubscription = Profileview.valueChanges().subscribe((val: any) => {
      console.log('val', val);
      if (val === undefined) {
        this.getuserinfoDetailsBehaviourSub.next(undefined);
      } else {
        if (val.ownerRecord.length === 0) {
          this.getuserinfoDetailsBehaviourSub.next(null);
        } else {
          this.localuserinfoDetails = val.userinfo;
          this.getuserinfoDetailsBehaviourSub.next(val.userinfo);
        }
      }
    });
    return this.getuserinfoDetailsBehaviourSub;
  };

  constructor(    public developmentservice: UserdataService,private db: AngularFirestore) { }
  userinfo:Subscription;

  ngOnInit(): void {
    //this.myuserProfile.userAuthenObj=this.profileinfoUid;
  }

  ngAfterViewInit(){
    this.myuserProfile.userAuthenObj=this.profileinfoUid;
    console.log(this.profileinfoUid);

    this.userinfo = this.myprojectControls.userdetailsprojectControl.valueChanges.pipe(
      startWith(''),
      map((ProfileviewSelected: string) => {

        this.userinfoDetails = this.getuserinfoDetails(this.db.doc(('/projectList/userDetails/')));
        console.log(this.userinfoDetails);


      })).subscribe(_=>{

      });
  }

  ngOnDestroy(){
    this.userinfo.unsubscribe();
    this.getuserinfoDetailsSubscription?.unsubscribe();
  }

}
