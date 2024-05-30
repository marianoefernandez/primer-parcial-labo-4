import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ErrorComponent } from './componentes/error/error.component';
import { FormsModule } from '@angular/forms';
import { HeladosComponent } from './componentes/helados/helados.component';

const firebaseConfig = {
  apiKey: "AIzaSyAOLKEke57Wxx_aUj-AMlgmYry44Q77g4s",
  authDomain: "primer-parcial-labo-4.firebaseapp.com",
  projectId: "primer-parcial-labo-4",
  storageBucket: "primer-parcial-labo-4.appspot.com",
  messagingSenderId: "282642937535",
  appId: "1:282642937535:web:fade6523e1ffcdbe33f80a"
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
