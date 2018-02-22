import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { UserService } from '../services/UserService';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { HTTP } from '@ionic-native/HTTP';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //HTTP
  ]
})
export class AppModule {}
