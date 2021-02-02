import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import { MainSectionGroup, projectDetails, UserdataService, usrinfoDetails } from '../service/userdata.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit ,OnDestroy {
  @Input() key: Observable<any>;


  myProjectdetails: projectDetails={
    projectName: '',//Heading in testcase list
    description:'',//Sub-Heading in testcase list
    photoUrl: '',//Description in testcase view
    projectUid: '',//stackblitzLink in testcase edit/doubleclick
    creationDate:'',
    profileName:''
  }

  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {


   }

  ngOnInit(): void {
  }
  ngOnDestroy() {

  }
}
