import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpielleiterRoutingModule } from './spielleiter-routing.module';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from './components/layout/layout.component';
import { PublicModule } from '@public/public.module';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { StyleClassModule } from 'primeng/styleclass';
import { PlayerSearchComponent } from './components/player-search/player-search.component';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { MyGroupsComponent } from './components/my-groups/my-groups.component';
import { MyTierlistComponent } from './components/my-tierlist/my-tierlist.component';
import { DataViewModule } from 'primeng/dataview';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [GameSearchComponent, AllGamesComponent, LayoutComponent, PlayerSearchComponent, MyGamesComponent, MyGroupsComponent, MyTierlistComponent],
  imports: [
    CommonModule,
    SpielleiterRoutingModule,
    FieldsetModule,
    DividerModule,
    RippleModule,
    ButtonModule,
    PublicModule,
    SidebarModule,
    DialogModule,
    ListboxModule,
    MultiSelectModule,
    FormsModule,
    AvatarModule,
    CheckboxModule,
    TooltipModule,
    StyleClassModule,
    SliderModule,
    DropdownModule,
    DataViewModule,
    ProgressBarModule,
  ],
})
export class SpielleiterModule { }
