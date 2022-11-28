import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArkRoutingModule } from './ark-routing.module';
import { ShopComponent } from './components/shop/shop.component';
import { ServerComponent } from './components/server/server.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [ShopComponent, ServerComponent, LayoutComponent],
  imports: [CommonModule, ArkRoutingModule, CardModule, TableModule, ButtonModule, RippleModule],
})
export class ArkModule {}
