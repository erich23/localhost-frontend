import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyexperiencesPage } from './myexperiences';

@NgModule({
 declarations: [
   MyexperiencesPage,
 ],
 imports: [
   IonicPageModule.forChild(MyexperiencesPage),
 ],
})
export class ExperiencesPageModule {}