import { Component } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { CategoriesPage } from '../categories/categories';
import { ProductsPage } from '../products/products';
import { LocationsPage } from '../locations/locations';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = ProfilePage;
  tab2 = CategoriesPage;
  tab3 = ProductsPage;
  tab4 = LocationsPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}





