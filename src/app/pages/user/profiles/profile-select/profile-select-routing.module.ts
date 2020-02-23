import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSelectPage } from './profile-select.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSelectPageRoutingModule {}
