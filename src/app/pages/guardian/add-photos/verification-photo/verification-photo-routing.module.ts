import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationPhotoPage } from './verification-photo.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationPhotoPageRoutingModule {}
