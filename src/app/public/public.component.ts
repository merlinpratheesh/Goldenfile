import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection} from '@angular/fire/firestore';
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
  @Output() projectDetails = new EventEmitter;



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
          this.getPublicListBehaviourSub.next(val.public);
          console.log(val.public);
        }
      }
    });
    return this.getPublicListBehaviourSub;
  };


  publicProjsel: Subscription;
  aftersel;
  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {
    this.publicProjsel = this.myprojectControls.publicprojectControl.valueChanges.pipe(
      startWith(''),
      map((publicProjectSelected: any) => {
        if (!publicProjectSelected || publicProjectSelected === '') {
          this.getPublicListSubscription?.unsubscribe();
          this.publicList = this.getPublicList(this.db.doc(('/projectList/publicProjects')));
          return publicProjectSelected;
        }
      })).subscribe(_ => {
      });
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.publicProjsel.unsubscribe();
    this.getPublicListSubscription?.unsubscribe();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.localpublicList, event.previousIndex, event.currentIndex);
  }

  projctsDetails(some) {
    console.log(some);
    this.aftersel = this.db.firestore.doc('/projectKeys' + some.projectName).pipe(
      switchMap((someval: any) => {
        console.log(someval);
        return this.db.doc(('/profile' + some.usedid).pipe(
          map((userdet: any) => {
            return ({ userdetails: userdet, projectkey: someval });
          })
        ))

      })
    )
  }


}