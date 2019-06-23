import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RaisecheckPage } from './raisecheck.page';

const routes: Routes = [
  {
    path: '',
    component: RaisecheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RaisecheckPage]
})
export class RaisecheckPageModule {}
