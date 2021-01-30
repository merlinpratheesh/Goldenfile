import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import { MainSectionGroup, projectControls, UserdataService, usrinfoDetails } from '../service/userdata.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit ,OnDestroy {
  @Input() key: Observable<any>;



  myprojectControls: projectControls = {
    projectkeysControl: new FormControl(null, Validators.required),
  }


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
  projectkeys: any;
  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {
    this.projectkeys = this.myprojectControls.projectkeysControl.valueChanges.pipe(
      startWith(''),
      map((KeySelected: string) => {
        if (!KeySelected || KeySelected === '') {
          this.Sections = this.getSections(this.db.doc(('/projectKeys/keys')));
          return KeySelected;
        }
      })).subscribe(_ => {
      });
   }

  ngOnInit(): void {
  }
  ngOnDestroy() {

    this.projectkeys.unsubscribe();

    this.getSectionsBehaviourSub?.unsubscribe();
  }
}
