import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthRouteComponent } from './routes/auth-route/auth-route.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { BolCoreModule } from './modules/bol-core/bol-core.module';
import { AuthGuard } from './guards/auth.guard';
import { AppBootstrapService } from './app-bootstrap.service';
import { BolCoreEventsToRouterMediatorService } from './mediators/bol-core-events-to-router-mediator.service';
import { RouterHelperService } from './services/router-helper.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BolCoreModule.forRoot(),
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        BolCoreEventsToRouterMediatorService,
        AppBootstrapService,
        RouterHelperService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
