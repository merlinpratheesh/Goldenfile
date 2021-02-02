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
import { environment } from '../environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { KeyComponent } from './key/key.component';
import { PublicComponent } from './public/public.component'
import {firebase,  FirebaseUIModule} from 'firebaseui-angular';
import {firebaseui} from 'firebaseui-angular';
const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInOptions: [
      {       
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        clientId: '808980311188-tsdv14grk5g7q0r8148up0ii8h2gf2f3.apps.googleusercontent.com'
      }],  
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  
  };

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    KeyComponent,
    PublicComponent
  ],
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
  bootstrap: [AppComponent]
})
export class AppModule { }
