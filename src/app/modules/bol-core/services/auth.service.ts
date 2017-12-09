import { Injectable } from '@angular/core';
import Noel from 'noel';
import { NoelEvent } from 'noel/dist/types/event';

@Injectable()
export class AuthService {

    private userChangedEvent: NoelEvent;

    constructor() {
        const em = new Noel();
        this.userChangedEvent = em.getEvent('userChanged');
    }


    login() {

    }

    logout() {

    }

}
