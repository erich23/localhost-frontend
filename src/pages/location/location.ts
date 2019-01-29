import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '../models/location';
import { Product } from '../models/product';
import { ProductPage } from '../product/product';

import {ProductService} from '../../services/product.service';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {


  public products: Array<Product>;
  public productService: ProductService;
  public location: Location = new Location();

  constructor(public navCtrl: NavController, public navParams: NavParams, productService: ProductService) {
    this.location = this.navParams.get("locationParameter"); //new Location()


    productService.getProductByCity(this.location.name)
      .then(res => res.json())
      .then(res => this.products = res);
    //    (err, result)=>{

    //   if(err){

    //     console.log("error!!! cant get product by city")
    //   }

    //   this.products = result.json();
    //   console.log(this.products.length);

    // });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  navigateToProduct(product: Product) {
    this.navCtrl.push(ProductPage, {
        productParameter: product
    });
  }

}




