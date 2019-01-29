import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationPage } from '../location/location';
import { Location } from '../models/location'
import { LocationService } from '../../services/location.service';
import { Product } from '../models/product';
import { ProductService } from '../../services/product.service';
import { Http } from '../../../node_modules/@angular/http';


/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {





  public products: Array<Product>;
  public productService: ProductService;
  public location: Location = new Location();

  public locations: Array<Location>;

  public listings: Array<number>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public locationService: LocationService ) {

    this.locations = [];


    locationService.getAllLocations().then((locations) => this.locations = locations);



    

  }



  


ionViewDidLoad() {





}

navigateToLocation(location: Location) {
  console.log("Navigating to LocationPage...");



  this.navCtrl.push(LocationPage, { locationParameter: location });
}

}