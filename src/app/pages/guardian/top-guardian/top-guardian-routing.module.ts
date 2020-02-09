import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopGuardianPage } from './top-guardian.page';

const routes: Routes = [
  {
    path: '',
    component: TopGuardianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopGuardianPageRoutingModule {}
