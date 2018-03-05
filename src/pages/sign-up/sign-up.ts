import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {UserService} from '../../services/UserService';
import {MainPage} from "../main/main";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(public navCtrl: NavController, private userService: UserService, public alertCtrl: AlertController, private storage: Storage) {
  }

  saveUser(form: any): void {
    delete form.value.PassConf;
    let user: any = form.value;
    this.userService.signUp(user)
      .subscribe(
        (response) => {
          this.storage.set('token', response.token);
          this.navCtrl.push(MainPage);
        },
        (err) => {
          this.showAlert(err.statusText, err._body)
        }
      );
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
