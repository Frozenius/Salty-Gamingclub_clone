import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { PlayerSearchComponent } from './components/player-search/player-search.component';
import { MyGroupsComponent } from './components/my-groups/my-groups.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { MyTierlistComponent } from './components/my-tierlist/my-tierlist.component';
import { AllGamesComponent } from './components/all-games/all-games.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'game-search', pathMatch: 'full' },
      { path: 'game-search', component: GameSearchComponent },
      { path: 'player-search', component: PlayerSearchComponent },
      // persöhnlich
      { path: 'my-groups', component: MyGroupsComponent },
      { path: 'my-games', component: MyGamesComponent },
      { path: 'my-tierlist', component: MyTierlistComponent },
      // admin - dev
      { path: 'all-games', component: AllGamesComponent },
      // { path: '**', redirectTo: 'selector', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpielleiterRoutingModule { }
