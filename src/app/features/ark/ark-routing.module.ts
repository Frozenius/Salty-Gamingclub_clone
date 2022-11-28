import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerComponent } from '@features/ark/components/server/server.component';
import { ShopComponent } from '@features/ark/components/shop/shop.component';
import { LayoutComponent } from '@features/ark/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'shop', component: ShopComponent },
      { path: 'server', component: ServerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArkRoutingModule {}
