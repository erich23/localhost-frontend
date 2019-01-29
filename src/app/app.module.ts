import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule, Menu } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegistrationPage } from '../pages/registration/registration';
import { ProductsPage } from '../pages/products/products';
import { ProductPage } from '../pages/product/product';
import { ProductService } from '../services/product.service';
import { PaymentPage } from '../pages/payment/payment';
import { HistoryPage } from '../pages/history/history';
import { LocationPage } from '../pages/location/location';
import { LocationService } from '../services/location.service';
import { LocationsPage } from '../pages/locations/locations';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { MenuPage } from '../pages/menu/menu';
import { CategoriesPage } from '../pages/categories/categories';
import { TabsPage } from '../pages/tabs/tabs';
import { CategoryPage } from '../pages/category/category';
import { ReviewsPage } from '../pages/reviews/reviews';
import { ReviewService } from '../services/reviews.service';
import { MyexperiencesPage } from '../pages/myexperiences/myexperiences';
import { SettingsPage } from '../pages/settings/settings';
import { PaymentconfirmPage } from '../pages/paymentconfirm/paymentconfirm';

//image upload imports INSTALL FIRST: npm i firebase angularfire2
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Globals } from './globals';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    ProductsPage,
    ProductPage,
    PaymentPage,
    HistoryPage,
    LocationPage,
    LocationsPage,
    AddproductPage,
    MenuPage,
    MyexperiencesPage,
    CategoriesPage,
    TabsPage,
    CategoryPage,
    ReviewsPage,
    SettingsPage,
    PaymentconfirmPage
  ],





  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    FormsModule,



    //for image uploads through firebase
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDjsynoR8uBbQ2-5C4rYdMEz5a7bbvjkyo",
      authDomain: "localhost-80513.firebaseapp.com",
      projectId: "localhost-80513",
      storageBucket: "localhost-80513.appspot.com",
    }),
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    ProductsPage,
    ProductPage,
    PaymentPage,
    HistoryPage,
    LocationPage,
    LocationsPage,
    AddproductPage,
    MenuPage,
    MyexperiencesPage,
    CategoriesPage,
    TabsPage,
    CategoryPage,
    ReviewsPage,
    SettingsPage,
    PaymentconfirmPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProductService,
    LocationService,
    ReviewService,
    Globals,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }