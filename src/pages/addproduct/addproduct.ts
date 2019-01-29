import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductsPage } from '../products/products';
import { Time } from '@angular/common';
import { ProductPage } from '../product/product';
import { Category } from '../models/categories';
//for image upload
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Globals } from '../../app/globals';



/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {


  //for image upload
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: string = null;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;

  public name: string;
  public description: string;
  public price: string;
  public category: string;
  public categoryOther: string;
  public date: Date[] = [];
  public time: Time[] = [];
  public categories: Array<Category>;
  public city: string;
  public flag: boolean;

  public dateError: boolean = false;

  public row: any

  public rows: Array<{}> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private afStorage: AngularFireStorage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public globals: Globals
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


  upload(event) {
    if (!event.target.files) return;


    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Uploading Image...',
      duration: 21031231

    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();

      console.log("image upload is taking too long")

    }, 60000);

    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));



    this.task.snapshotChanges().subscribe(
      result => {
        result.ref.getDownloadURL().then(dl => {
          this.downloadURL = dl;
          loading.dismiss();
          console.log(this.downloadURL);
        }).catch(err => {
          console.log(err);
        });
      }
    )

  }


  addrow(): void {
    this.rows.push(this.row);
  }

  deleterow(): void {
    this.rows.pop();
  }

  datesAreValid() {

    if (this.date.length == 0 || this.time.length == 0) {
      return false;
    }

    var newDate = new Date().getDate;



    console.log(newDate);

    for (let i = 0; i < this.date.length; ++i) {
      console.log(this.date[i].getDate);
      if (newDate >= this.date[i].getDate) {

        return false;

      }

    }

    return true;

  }


  addproduct() {

    if (this.date.length == 0 || this.time.length == 0) {
      this.dateError = true;
      return;
    }

    if (this.downloadURL === null) {
      this.downloadURL = "../../assets/imgs/localhostlogo2.png"
    }

    if (this.category === 'other') {
      this.category = this.categoryOther;
    }

    this.http.post(this.globals.URL + '/addcategory', {
      name: this.category
    })
      .subscribe(
        result => {
          console.log(result.json());
          console.log("result.json()");
          let categoryInfo = result.json();
          this.http.post(this.globals.URL + '/addproduct?jwt=' + localStorage.getItem("TOKEN"), {
            name: this.name,
            description: this.description,
            category_id: categoryInfo.category_id,
            city: this.city,
            photo_url: this.downloadURL
          }).subscribe(
            result => {
              console.log(result.json());
              let productInfo = result.json()
              for (let i = 0; i < this.date.length; i++) {

                this.http.post(this.globals.URL + '/addmenu?product_id=' + productInfo.product_id, {
                  price: this.price,
                  date: this.date[i],
                  time: this.time[i]
                }).subscribe(
                  result => {
                    console.log(result.json());
                  }, err => {
                    console.log(err);
                    this.flag = true;
                  }
                )
              }
              this.navCtrl.setRoot(ProductsPage, productInfo)
            }, err => {
              console.log(err);
              this.flag = true;
            }
          )
        }, err => {
          console.log(err);
          this.flag = true;
        }

      )


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');

    this.http.get(this.globals.URL + '/allcategories')
      .subscribe(
        result => {
          console.log(result)
          this.categories = result.json();
        }, err => {
          console.log(err)
        }
      )
  }

}
