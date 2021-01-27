import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map, switchMap, startWith, withLatestFrom } from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ChangeDetectionStrategy} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { projectControls,UserdataService } from './service/userdata.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  @Input() profileinfoUid: firebase.User;
  myprojectControls: projectControls = {
    publicprojectControl: new FormControl(null, Validators.required)
  };
 
  publicList = of(undefined);
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
  constructor(    public developmentservice: UserdataService,private db: AngularFirestore) { 
    this.publicProjsel = this.myprojectControls.publicprojectControl.valueChanges.pipe(
      startWith(''),
      map((publicProjectSelected: string) => {
        if (!publicProjectSelected || publicProjectSelected === '') {
          this.localpublicList = [];
          this.getPublicListSubscription?.unsubscribe();
          this.publicList = this.getPublicList(this.db.doc(('/projectList/publicProjects')));    
          return publicProjectSelected;
        }
      })).subscribe(_=>{

      });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.localpublicList, event.previousIndex, event.currentIndex);
  }
  ngOnDestroy(){
    this.publicProjsel.unsubscribe();
    this.getPublicListSubscription?.unsubscribe();
  }

}