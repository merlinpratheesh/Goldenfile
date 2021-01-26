import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserdataService } from './service/userdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnlineAuthOnetap';
  myonline;
  subjectonline = new BehaviorSubject(undefined);
  getObservableonlineSub: Subscription = new Subscription;
  getObservableonine = (localonline: Observable<boolean>) => {
    this.getObservableonlineSub?.unsubscribe();
    this.getObservableonlineSub = localonline.subscribe((valOnline: any) => {
      console.log('19', valOnline);
      this.subjectonline.next(valOnline);
    });
    return this.subjectonline;
  }
  OnlineCheck: undefined;
    constructor(
      public developmentservice: UserdataService)
  {
    this.myonline = this.getObservableonine(this.developmentservice.isOnline$);
    this.OnlineCheck = this.myonline.pipe(
      switchMap((onlineval: any) => {
        console.log('31',onlineval);
        if (onlineval === true) 
        alert('Good Connection');
        else{
          alert('check internet Connection');

        }
        return of(onlineval);
      }));

  }
}
