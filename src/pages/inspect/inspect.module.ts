import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectPage } from './inspect';

@NgModule({
  declarations: [
    InspectPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InspectPageModule {}
