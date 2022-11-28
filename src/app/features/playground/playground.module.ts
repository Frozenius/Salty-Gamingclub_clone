import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { PublicModule } from '@public/public.module';

@NgModule({
  declarations: [SandboxComponent],
  imports: [CommonModule, PlaygroundRoutingModule, PublicModule],
})
export class PlaygroundModule {}
