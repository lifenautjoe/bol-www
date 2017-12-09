import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './auth-route.routes';
import { RouterModule } from '@angular/router';
import { AuthRouteComponent } from './auth-route.component';
import { BolCoreModule } from '../../modules/bol-core/bol-core.module';

@NgModule({
  imports: [
    CommonModule,
    BolCoreModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AuthRouteComponent
  ]
})
export class AuthRouteModule {
}
