import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthApiService } from './services/auth-api.service';
import { HttpClientModule } from '@angular/common/http';
import { PromisedHttpService } from './services/promised-http.service';
import { LoggerFactoryService } from './services/logger-factory.service';
import { UserFactoryService } from './factories/user-factory.service';
import { GameFactoryService } from './factories/game-factory.service';

@NgModule({
    providers: [
        UserFactoryService,
        GameFactoryService,
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
