import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './game-route.routes';
import { RouterModule } from '@angular/router';
import { GameRouteComponent } from './game-route.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    GameRouteComponent
  ]
})
export class GameRouteModule {
}
