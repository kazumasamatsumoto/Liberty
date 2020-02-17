import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserChoicePageRoutingModule } from './user-choice-routing.module';

import { UserChoicePage } from './user-choice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserChoicePageRoutingModule
  ],
  declarations: [UserChoicePage]
})
export class UserChoicePageModule {}
