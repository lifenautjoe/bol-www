import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/bol-core/services/auth.service';
import { LoggerFactoryService, Logolous } from '../../modules/bol-core/services/logger-factory.service';
import { RouterHelperService } from '../../modules/bol-core/services/router-helper.service';

@Component({
    selector: 'bol-auth-route',
    templateUrl: './auth-route.component.html',
    styleUrls: ['./auth-route.component.scss']
})
export class AuthRouteComponent implements OnInit {

    userName: string;
    logInInProgress: boolean;
    logger: Logolous;
    errorMessage: string;

    constructor(private loggerFactoryService: LoggerFactoryService,
                private authService: AuthService,
                private routerHelperService: RouterHelperService) {
        this.logger = loggerFactoryService.make('AuthRouteComponent');
    }

    ngOnInit() {

    }

    logInUser() {
        debugger;
        if (this.logInInProgress) return;
        this.logInInProgress = true;
        this.authService.logIn(this.userName).then(() => {
            this.logger.info(`${this.userName} was logged in! Sending to games`);
            debugger;
            return this.routerHelperService.goToGames().then(() => {
                this.logger.info('sent!');
            }).catch((err) => {
                this.logger.info(err);
            })
        }).catch((err) => {
            debugger;
            this.logger.error(`Could not log in "${this.userName}" with error:`, err);
            this.errorMessage = err.error.message;
        }).finally(() => {
            this.logInInProgress = false;
        });
    }
}
