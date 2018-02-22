import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ionViewDidLoad() {}

  goBack = (): void => {
    this.navCtrl.pop();
  }

  saveUser (form: any): void {
    delete form.value.PassConf;
    let user: any = form.value;
    this.userService.signUp(user)
    .subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    );
  }

}
