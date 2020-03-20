import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DebugMenuComponent } from './debug-menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [DebugMenuComponent],
  exports: [DebugMenuComponent]
})
export class DebugMenuComponentModule {}
