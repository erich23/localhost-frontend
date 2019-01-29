import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Reviews } from '../models/reviews';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/reviews.service';
import { Product } from '../models/product';

/**
* Generated class for the ReviewPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
 selector: 'page-reviews',
 templateUrl: 'reviews.html',
})
export class ReviewsPage {

 public reviews: Array<Reviews>;
 public products: Array<Product>;

 constructor(public navCtrl: NavController, public navParams: NavParams,
   public productService: ProductService,
   public reviewService: ReviewService) {

     this.productService.getAllProducts((err, data) => {
       if (err) {
           throw err;
       }

       this.products = data;
   })
     this.reviews = reviewService.getAllReviews();

 }

 ionViewDidLoad() {
   console.log('ionViewDidLoad ReviewPage');
 }

}
