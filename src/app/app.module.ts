import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthRouteComponent } from './routes/auth-route/auth-route.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { BolCoreModule } from './modules/bol-core/bol-core.module';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BolCoreModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
