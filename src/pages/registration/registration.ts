import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
//image upload
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Globals } from '../../app/globals';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {

  //for image upload
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: string = null;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;

  public email: string;
  public firstname: string;
  public lastname: string;
  public password: string;
  public confirmPassword: string;
  public phone: string;
  public flag: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private afStorage: AngularFireStorage,
    public loadingCtrl: LoadingController,
    public globals: Globals,
    private alertCtrl: AlertController) {

  }

  register() {

    //set profile picture to default angry cat if not given custom image
    if (this.downloadURL == null) {

      this.downloadURL = "https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg";
    }

    console.log(this.downloadURL + "HERE KITTY KITTY")
    this.http.post(this.globals.URL + '/registration', {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      photo_url: this.downloadURL
    }).subscribe(
      result => {
        console.log(result);
        this.navCtrl.push(LoginPage);
      },
      err => {
        console.log(err);
        this.flag = true;
      }
    )
  }



  navigateToLogin() {
    console.log("Navigating to LoginPage...");

    this.navCtrl.push(LoginPage);
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




}