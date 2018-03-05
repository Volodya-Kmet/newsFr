import {Component} from '@angular/core';
import {UserService} from "../../services/UserService";
import {Storage} from "@ionic/storage";
import {AlertController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public user: any = {
    FirstName: '',
    LastName: '',
    Categories: [],
    category: [],
    Country: '',
    NewPassword: '',
    Password: ''
  };
  public ConfirmPassword: string = null;


  constructor(private userService: UserService, private storage: Storage, public navCtrl: NavController,
              public alertCtrl: AlertController) {
    this.getUser();
  }

  saveChanges(user) {
    this.user.Categories = [];
    for (let category in this.user.category) {
      if (this.user.category[category]) {
        this.user.Categories.push(category)
      }
    }
    this.storage.get('token').then(token => {
      this.userService.updateUser(token, user)
        .subscribe(
          response => {
            this.storage.set('token', response.token);
            this.showAlert("Changes were saved", null);
          },
          err => {
            this.showAlert(err.statusText, err._body);
          })
    })
  }

  getUser() {
    this.storage.get('token').then(token => {
      this.userService.getUser(token)
        .subscribe(
          response => {
            this.user = response.user;
            this.getCategories(this.user.Categories)
          },
          err => {
            this.navCtrl.push(LoginPage);
            this.showAlert(err.statusText, err._body);
          })
    })

  }

  getCategories(categArr) {
    if (categArr) {
      this.user.category = [];
      for (let item of categArr) {
        this.user.category[item] = true
      }
    } else {
      this.user.category = [];
    }
  }

  showAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
