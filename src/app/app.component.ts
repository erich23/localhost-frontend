import { Component, Injector } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';
import { Globals } from './globals';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;





  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public globals: Globals,
    public http: Http) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });



    if (localStorage.getItem("TOKEN")) {

      this.http.get(this.globals.URL + "/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
            this.rootPage = TabsPage;

          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    } else {
      this.rootPage = HomePage;
    }
  }
}
