import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/bol-core/services/auth.service';
import { LoggerFactoryService, Logolous } from '../../modules/bol-core/services/logger-factory.service';

@Component({
    selector: 'bol-auth-route',
    templateUrl: './auth-route.component.html',
    styleUrls: ['./auth-route.component.scss']
})
export class AuthRouteComponent implements OnInit {

    userName: string;
    logInInProgress: boolean;
    logger: Logolous;

    constructor(private loggerFactoryService: LoggerFactoryService, private authService: AuthService) {
        this.logger = loggerFactoryService.make('AuthRouteComponent');
    }

    ngOnInit() {
    }

    logInUser() {
        if (this.logInInProgress) return;
        this.logInInProgress = true;
        this.authService.logIn(this.userName).then(() => {
            this.logger.info(`${this.userName} was logged in!`);
        }).catch((err) => {
            this.logger.error(`Could not log in "${this.userName}" with error:`, err);
        }).finally(() => {
            this.logInInProgress = false;
        });
    }
}
