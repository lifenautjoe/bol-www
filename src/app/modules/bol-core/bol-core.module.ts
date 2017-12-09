import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@NgModule({
  providers: [
    AuthService
  ],
  imports: [
    CommonModule
  ],
  declarations: []
})
export class BolCoreModule {
}
