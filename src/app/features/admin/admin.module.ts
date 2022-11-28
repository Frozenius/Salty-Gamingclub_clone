import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PublicModule } from '@public/public.module';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DiscordComponent } from './components/discord/discord.component';

@NgModule({
  declarations: [UsersComponent, SettingsComponent, DiscordComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ButtonModule,
    RippleModule,
    PublicModule,
    TreeSelectModule,
    MultiSelectModule,
    FormsModule,
    ConfirmPopupModule,
    TableModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
  ],
})
export class AdminModule {}
