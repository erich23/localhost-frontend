import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { Menu } from '../models/menu';
import { Transaction } from '../models/transaction';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the PaymentconfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentconfirm',
  templateUrl: 'paymentconfirm.html',
})
export class PaymentconfirmPage {

  public product: Product = new Product();
  public menu: Menu = new Menu();
  public transaction: Transaction = new Transaction();
  public menuDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("productParameter");
    this.menu = this.navParams.get("menuParameter");
    this.transaction = this.navParams.get("paymentConfirm");
    this.transaction.date_sold = this.processDate(this.transaction.date_sold);

  }

  processDate(date: string) {
    for (let i = 0; i < date.length; ++i) {
      if (date[i] == 'T') {
        date = date.substr(0, i);
        break;
      }
    }

    return date;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentconfirmPage');

  }

  navigateToProducts() {
    this.navCtrl.setRoot(ProductsPage);
  }

}
