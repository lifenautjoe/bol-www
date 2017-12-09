import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './auth-route.routes';
import { RouterModule } from '@angular/router';
import { AuthRouteComponent } from './auth-route.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AuthRouteComponent
  ]
})
export class AuthRouteModule {
}
