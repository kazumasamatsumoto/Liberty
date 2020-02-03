import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopGuardianPageRoutingModule } from './top-guardian-routing.module';

import { TopGuardianPage } from './top-guardian.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopGuardianPageRoutingModule
  ],
  declarations: [TopGuardianPage]
})
export class TopGuardianPageModule {}
