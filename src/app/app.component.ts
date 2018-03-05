import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
import {MainPage} from "../pages/main/main";
import {SettingsPage} from "../pages/settings/settings";

import {Storage} from "@ionic/storage";
import {UserService} from "../services/UserService";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private storage: Storage, public userService: UserService) {
    this.initializeApp();
    this.getStarterPage();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Settings', component: SettingsPage},
      {title: 'Main', component: MainPage},
      {title: 'Logout', component: LoginPage},
    ];
  }

  getStarterPage() {
    this.storage.get('token').then(token => {
      if (token) {
        this.userService.updateToken(token)
          .subscribe(
            (response) => {
              this.storage.set('token', response.token);
              this.rootPage = MainPage;
            },
            (err) => {
              this.rootPage = LoginPage;
            }
          )
      } else {
        this.rootPage = LoginPage;
      }
    })
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.title === 'Logout') {
      this.userService.logout();
    }
    this.nav.setRoot(page.component, {}, {animate: true, direction: "forward"});
  }
}
