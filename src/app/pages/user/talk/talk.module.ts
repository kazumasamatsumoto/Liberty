import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalkPageRoutingModule } from './talk-routing.module';

import { TalkPage } from './talk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalkPageRoutingModule
  ],
  declarations: [TalkPage]
})
export class TalkPageModule {}
