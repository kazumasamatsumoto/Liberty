import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopUserPage } from './top-user.page';

const routes: Routes = [
  {
    path: '',
    component: TopUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopUserPageRoutingModule {}
