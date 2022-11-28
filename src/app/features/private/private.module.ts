import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import { PublicModule } from '@public/public.module';
import { LayoutComponent } from '@features/private/components/layout/layout.component';
import { CyvedComponent } from '@features/private/components/cyved/cyved.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [ProfileComponent, LayoutComponent, CyvedComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    InputSwitchModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    BadgeModule,
    PublicModule,
    ConfirmPopupModule,
  ],
})
export class PrivateModule {}
