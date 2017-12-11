import { Injectable } from '@angular/core';
import { BolCoreEventsService } from '../modules/bol-core/services/bol-core-events.service';
import { RouterHelperService } from '../services/router-helper.service';

@Injectable()
export class BolCoreEventsToRouterMediatorService {

    constructor(private bolCoreEventsService: BolCoreEventsService,
                private routerHelperService: RouterHelperService) {
    }


    init() {
        this.bolCoreEventsService.onUserLoggedIn(() => {
            debugger;
            this.routerHelperService.goToGames();
        });

        this.bolCoreEventsService.onUserLoggedOut(() => {
            debugger;
            this.routerHelperService.goToAuth();
        });
    }
}
