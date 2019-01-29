import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentconfirmPage } from './paymentconfirm';

@NgModule({
  declarations: [
    PaymentconfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentconfirmPage),
  ],
})
export class PaymentconfirmPageModule {}
