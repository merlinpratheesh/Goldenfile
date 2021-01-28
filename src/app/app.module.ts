import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSharedModule } from './app-shared/app-shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {firebase,  FirebaseUIModule} from 'firebaseui-angular';
import { environment } from 'src/environments/environment';
import * as firebaseui from 'firebaseui';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInOptions: [
      {       
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        clientId: '1075525420003-393vor4371dr05rlou9890vf8hv8m7p4.apps.googleusercontent.com'
      }],  
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  
  };


@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppSharedModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)


  ],
  providers: [],
    declarations: [ AppComponent ],

  bootstrap: [AppComponent],

})
export class AppModule { }
