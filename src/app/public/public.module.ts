import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaneButtonComponent } from './components/plane-button/plane-button.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { TermsComponent } from './components/terms/terms.component';
import { LockComponent } from './components/lock/lock.component';
import { TooltipModule } from 'primeng/tooltip';
import { GameCapsuleComponent } from './components/game-capsule/game-capsule.component';
import { ImageModule } from 'primeng/image';
import { RippleModule } from 'primeng/ripple';
import { GameDialogComponent } from './components/game-dialog/game-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { EventCapsuleComponent } from './components/event-capsule/event-capsule.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartModule } from 'primeng/chart';
import { TrackByIdDirective } from '@public/functions/ng-for-track-by-id.directive';
import { TrackByPropertyDirective } from '@public/functions/ng-track-by-property.directive';
import { ServerIconPipe } from './pipes/server-icon.pipe';
import { PageloaderComponent } from './components/pageloader/pageloader.component';

const PUBLIC_COMPONENTS = [
  PlaneButtonComponent,
  PrivacyComponent,
  ImpressumComponent,
  TermsComponent,
  LockComponent,
  GameCapsuleComponent,
  GameDialogComponent,
  EventCapsuleComponent,
  LineChartComponent,
  TrackByIdDirective,
  TrackByPropertyDirective,
];

@NgModule({
  declarations: [PUBLIC_COMPONENTS, ServerIconPipe, PageloaderComponent],
  imports: [CommonModule, TooltipModule, ImageModule, RippleModule, DialogModule, DividerModule, TagModule, ChartModule],
  exports: [PUBLIC_COMPONENTS],
})
export class PublicModule {}
