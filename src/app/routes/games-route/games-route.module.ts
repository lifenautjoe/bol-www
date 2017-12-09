import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './games-route.routes';
import { RouterModule } from '@angular/router';
import { GamesRouteComponent } from './games-route.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    GamesRouteComponent
  ]
})
export class GamesRouteModule {
}
