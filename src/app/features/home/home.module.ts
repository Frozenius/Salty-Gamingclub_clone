import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { PublicModule } from '@public/public.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, HomeRoutingModule, PublicModule, ButtonModule, RippleModule, DividerModule, CarouselModule],
})
export class HomeModule {}
