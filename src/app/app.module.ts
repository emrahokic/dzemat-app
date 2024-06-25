import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {connectAuthEmulator, getAuth, provideAuth} from "@angular/fire/auth";
import {connectFirestoreEmulator, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {connectStorageEmulator, getStorage, provideStorage} from "@angular/fire/storage";
import { LoginComponent } from './login/login.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { LiveInfoComponent } from './live-info/live-info.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import {ReactiveFormsModule} from "@angular/forms";
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {NgOptimizedImage} from "@angular/common";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Cz86b46Qv0oH0ncGt1ONV8eo7X7Ur9Q",
  authDomain: "dzemat-bosna.firebaseapp.com",
  projectId: "dzemat-bosna",
  storageBucket: "dzemat-bosna.appspot.com",
  messagingSenderId: "114090692744",
  appId: "1:114090692744:web:69c62313a7a5688d990f3d",
  measurementId: "G-JCECBE67T7"
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SlideShowComponent,
    LiveInfoComponent,
    ConfigurationComponent,
    IndexComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(firebaseConfig)),

        provideAuth(() => {
            const auth = getAuth();
            if (location.hostname === 'localhost') {
                connectAuthEmulator(auth, 'http://127.0.0.1:9099', {disableWarnings: true});
            }
            return auth;
        }),

        provideFirestore(() => {
            const firestore = getFirestore();
            if (location.hostname === 'localhost') {
                connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
            }
            return firestore;
        }),

        provideStorage(() => {
            const storage = getStorage();
            if (location.hostname === 'localhost') {
                connectStorageEmulator(storage, '127.0.0.1', 5001);
            }
            return storage;
        }),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatListModule,
        NgOptimizedImage,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
