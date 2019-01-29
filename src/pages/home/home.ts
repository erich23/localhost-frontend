import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductsPage } from '../products/products';
import { PaymentPage } from '../payment/payment';
import { Globals } from '../../app/globals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public globals: Globals,
    public http: Http) {

    if (localStorage.getItem("TOKEN")) {

      this.http.get(this.globals.URL + "/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
            this.navCtrl.push(ProductsPage);

          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }
  }

  navigateToLogin() {
    console.log("Navigating to LoginPage...");

    this.navCtrl.push(LoginPage);
  }

  navigateToRegistration() {
    console.log("Navigating to RegistrationPage...")

    this.navCtrl.push(RegistrationPage);
  }

}