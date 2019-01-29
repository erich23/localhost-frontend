import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RegistrationPage } from '../registration/registration';
import { ProductsPage } from '../products/products';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { Globals } from '../../app/globals';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: string;
  public password: string;
  public flag: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public globals: Globals,
    public http: Http) { }

  login() {
    this.http.post(this.globals.URL + '/login', {
      email: this.email,
      password: this.password
    }).subscribe(
      result => {
        console.log(result);

        var jwtResponse = result.json();
        var token = jwtResponse.token;

        localStorage.setItem("TOKEN", token);
        this.navCtrl.setRoot(TabsPage);
        // this.navCtrl.push(ProductsPage);
      },
      err => {
        console.log(err);
        this.flag = true;
      }
    )
  }

  navigateToProfile() {
    console.log("Navigating to ProfilePage...");

    this.navCtrl.push(ProfilePage);
  }

  navigateToRegistration() {
    console.log("Navigating to RegistrationPage...")

    this.navCtrl.push(RegistrationPage);
  }

  /*
  pressMe(argument1: string, argument2: number) {
    console.log("This email is: " + this.email);
    console.log("Argument 1:", argument1);
    console.log("Argument 2:", argument2);
  }
  loopOne() {
    for (var i = 0; i < this.names.length; i++)  {
      console.log("Element: ", this.names[i]);
    }
    console.log("First element: ", this.names[0]);
  }
  loopTwo() {
    this.names.forEach((item) => {
      console.log("Element: ", item);
    })
  }
  login() {
    if (this.password == "my-secure-password") {
      // Navigate
    } else {
      // Stay here...
    }
    /*
    if (this.age < 21) {
      // No drinking allowed
    } else {
      // Party
    }
    
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 5cedc30609313fad014cc8759eaf55f9b9fabced
  end of notes */
}