import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '@features/admin/components/users/users.component';
import { DiscordComponent } from '@features/admin/components/discord/discord.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'discord', component: DiscordComponent },
  // { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
