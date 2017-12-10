import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthApiService } from './services/auth-api.service';
import { HttpClientModule } from '@angular/common/http';
import { PromisedHttpService } from './services/promised-http.service';
import { LoggerFactoryService } from './services/logger-factory.service';

@NgModule({
    providers: [
        AuthService,
        PromisedHttpService,
        AuthApiService,
        AuthService,
        LoggerFactoryService
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: []
})
export class BolCoreModule {
}
