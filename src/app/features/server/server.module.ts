import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { ServerListComponent } from './components/server-list/server-list.component';
import { ServerDashboardComponent } from './components/server-dashboard/server-dashboard.component';
import { FormsModule } from '@angular/forms';
import { ServerOptionsComponent } from './components/server-options/server-options.component';
import { ServerStatusComponent } from './components/server-status/server-status.component';

@NgModule({
  declarations: [ServerListComponent, ServerDashboardComponent, ServerOptionsComponent, ServerStatusComponent],
  imports: [CommonModule, ServerRoutingModule, ChartModule, TableModule, ButtonModule, RippleModule, TagModule, DialogModule, DropdownModule, InputTextModule, FormsModule],
})
export class ServerModule {}
