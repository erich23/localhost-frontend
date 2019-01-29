import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { User } from '../models/user';

//image upload
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { get } from '../../../node_modules/@ionic-native/core';
import { ProfilePage } from '../profile/profile';
import { Globals } from '../../app/globals';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  //for image upload
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: string = null;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  public user: User = new User();



  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public globals: Globals,

    private afStorage: AngularFireStorage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

    if (localStorage.getItem("TOKEN")) {

      this.http.get(this.globals.URL + "/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            let payload = result.json();
            console.log(payload);
            this.user = payload.user;

          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
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


          this.http.get('http://localhost:3000/changeprofilepic?url=' + this.downloadURL + '&userid=' + this.user.user_id).subscribe(
            result => {
              console.log(result);

              this.user = result.json();

              this.user.photo_url = this.downloadURL;

              this.navCtrl.setRoot(ProfilePage);
            },
            err => {
              console.log(err);
            }
          )


          console.log(this.downloadURL);
        }).catch(err => {
          console.log(err);
        });
      }
    )






  }

}
