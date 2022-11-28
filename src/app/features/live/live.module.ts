import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './components/live/live.component';
import { RippleModule } from 'primeng/ripple';
import { LayoutComponent } from './components/layout/layout.component';
import { PublicModule } from '@public/public.module';
import { StyleClassModule } from 'primeng/styleclass';
import { SkeletonModule } from 'primeng/skeleton';
import { PlyrModule } from 'ngx-plyr';
import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LiveComponent, LayoutComponent],
  imports: [CommonModule, LiveRoutingModule, RippleModule, PublicModule, StyleClassModule, SkeletonModule, PlyrModule, FormsModule, KeyFilterModule, InputTextModule, ButtonModule],
})
export class LiveModule { }
