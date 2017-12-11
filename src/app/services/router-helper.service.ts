import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterHelperService {

    constructor(private router: Router) {

    }

    goToGames(): Promise<boolean> {
        return this.router.navigateByUrl('/games');
    }

    goToAuth(): Promise<boolean> {
        return this.router.navigateByUrl('/auth');
    }
}
