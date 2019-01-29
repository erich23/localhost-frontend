import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { PaymentPage } from '../payment/payment';
import { ProductService } from '../../services/product.service';
import { MenuPage } from '../menu/menu';
import { Http } from '@angular/http';
import { User } from '../models/user';
import { ReviewsPage } from '../reviews/reviews';
import { ReviewService } from '../../services/reviews.service';
import { Reviews } from '../models/reviews';
import { Globals } from '../../app/globals';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {



  public product: Product = new Product();
  public user: User = new User();
  public productService: ProductService;
  public reviewService: ReviewService;
  public reviews: Array<Reviews>

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public globals: Globals) {
    this.product = this.navParams.get("productParameter"); //new Product()
    this.reviewService = new ReviewService(http);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.http.get(this.globals.URL + '/producthost?provider_id=' + this.product.provider_id
    ).subscribe(
      result => {
        console.log(result);
        this.user = result.json();
      }, err => {
        console.log(err);
      }
    )

    this.reviews = this.reviewService.getAllReviews()

  }





  navigateToMenu() {
    console.log("Navigating to MenuPage...");
    this.navCtrl.push(MenuPage, { productParameter: this.product });
  }

}