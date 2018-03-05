import {Component} from '@angular/core';
import {NavController, ModalController, AlertController} from 'ionic-angular';
import {SignUpPage} from '../sign-up/sign-up';
import {Storage} from '@ionic/storage';
import {UserService} from "../../services/UserService";
import {MainPage} from "../main/main";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private storage: Storage, private userService: UserService,
              public alertCtrl: AlertController) {
    this.storage.clear()
  }


  openSignUp = () => {
    let modal = this.modalCtrl.create(SignUpPage);
    modal.present();
  };

  login(form: any): void {
    let user: any = form.value;
    this.userService.login(user)
      .subscribe(
        (response) => {
          this.storage.set('token', response.token);
          this.navCtrl.setRoot(MainPage)
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
