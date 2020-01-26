import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCreatePage } from './qr-create.page';

const routes: Routes = [
  {
    path: '',
    component: QrCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCreatePageRoutingModule {}
