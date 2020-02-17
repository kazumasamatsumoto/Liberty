import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoSelectionPage } from './photo-selection.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoSelectionPageRoutingModule {}
