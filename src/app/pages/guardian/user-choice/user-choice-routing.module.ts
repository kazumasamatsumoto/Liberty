import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserChoicePage } from './user-choice.page';

const routes: Routes = [
  {
    path: '',
    component: UserChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserChoicePageRoutingModule {}
