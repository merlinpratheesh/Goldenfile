import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSharedModule } from './app-shared/app-shared.module';
import { NestedTreeComponent,BottomSheetChangeOrder } from './nested-tree/nested-tree.component';
import { AddNodeComponent,NewNodeDialog } from './nested-tree/add-node/add-node.component';
import { DeleteNodeComponent, } from './nested-tree/delete-node/delete-node.component';
import { EditNodeComponent,EditNodeDialog } from './nested-tree/edit-node/edit-node.component';
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
        clientId: '325755404242-i8ufs5g8moq28o4oh38nv6qf3cbbt1gd.apps.googleusercontent.com'
      }],  
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  
  };

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    KeyComponent,
    PublicComponent,
    NestedTreeComponent,
    BottomSheetChangeOrder,
    AddNodeComponent,
    NewNodeDialog,
    DeleteNodeComponent,
    EditNodeComponent,
    EditNodeDialog
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
