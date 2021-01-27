import { Component,OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService} from 'firebaseui-angular';
@Component({
  selector: 'fbui-ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService) {
  firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
}

    ngOnInit(): void {
    //this.afAuth.authState.subscribe(d => console.log(d));
  }
  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);

  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }

  uiShownCallback() {
    console.log('UI shown');
  }
  
  logout() {
    this.afAuth.signOut();
  }

}
