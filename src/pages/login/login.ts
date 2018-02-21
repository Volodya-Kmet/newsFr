import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  openSignUp = () => {
    let modal = this.modalCtrl.create(SignUpPage);
    modal.present();
  }
}
