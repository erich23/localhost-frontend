import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, App, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import { Http } from '@angular/http';
import { User } from '../models/user';
import { MyexperiencesPage } from '../myexperiences/myexperiences';
import { SettingsPage } from '../settings/settings';
import { Globals } from '../../app/globals';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public user: User = new User();

  constructor(
    public navCtrl: NavController,
    public globals: Globals,
    public navParams: NavParams,
    public http: Http,
    private app: App,
    public alertCtrl: AlertController
  ) {

    if (localStorage.getItem("TOKEN")) {

      this.http.get(this.globals.URL + "/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    console.log(this.globals.URL)


    this.http.get(this.globals.URL + "/user?jwt=" + localStorage.getItem("TOKEN")
    ).subscribe(
      result => {
        console.log(result);
        this.user = result.json();
      }, err => {
        console.log(err)
      }
    )

  }

  navigateToHome() {
    console.log("Navigating to HomePage...");

    const confirm = this.alertCtrl.create({
      title: 'Log out?',
      message: 'Logging out will refer you back to the home page.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Log out',
          handler: () => {
            console.log('Log out clicked');
            localStorage.removeItem("TOKEN");
            this.app.getRootNav().setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

  navigateToHistory() {
    console.log("Navigating to HistoryPage...");

    this.navCtrl.push(HistoryPage);

  }
  navigateToExperiences() {
    console.log("Navigating to ExperiencesPage...");

    this.navCtrl.push(MyexperiencesPage, {
      userParameter: this.user
    });

  }

  navigateToSettings() {
    console.log("Navigating to SettingsPage...");

    this.navCtrl.push(SettingsPage);
  }
}