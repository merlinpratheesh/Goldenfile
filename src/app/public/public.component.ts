import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map, switchMap, startWith, withLatestFrom } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { projectControls, projectDetails, UserdataService, userProfile } from '../service/userdata.service';
import { docData } from 'rxfire/firestore';


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  @Output() projctsDetails = new EventEmitter;



  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success
    myusrinfoFromDb: null

  };
  myprojectControls: projectControls = {
    publicprojectControl: new FormControl(null, Validators.required),
  }


  publicList: any;
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
          console.log(val.public);
          this.getPublicListBehaviourSub.next(val.public);

        }
      }
    });
    return this.getPublicListBehaviourSub;
  };


  
  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {

    this.publicList = this.getPublicList(this.db.doc(('/projectList/publicProjects')));

  }


  projectsDetails(some) {
    console.log('86', some);
    this.projctsDetails.emit({ ref: some.projectsUid, keyref: some.projectName })
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.getPublicListSubscription?.unsubscribe();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.localpublicList, event.previousIndex, event.currentIndex);
  }



}