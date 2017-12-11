import { Injectable } from '@angular/core';
import { NoelEvent } from 'noel/dist/types/event';
import Noel from 'noel';
import { User } from '../models/user';
import { LoggerFactoryService, Logolous } from './logger-factory.service';

@Injectable()
export class BolCoreEventsService {

    userLoggedInEvent: NoelEvent;
    userLoggedOutEvent: NoelEvent;
    logger: Logolous;

    constructor(loggerFactory: LoggerFactoryService) {
        debugger;
        const ee = new Noel();
        this.userLoggedInEvent = ee.getEvent('userLoggedIn');
        this.userLoggedOutEvent = ee.getEvent('userLoggedOut');
        this.logger = loggerFactory.make('BolCoreEventsService');
    }

    onUserLoggedIn(listener) {
        debugger;
        return this.userLoggedInEvent.on(listener);
    }

    onUserLoggedOut(listener) {
        return this.userLoggedOutEvent.on(listener);
    }

    emitUserLoggedIn(user: User) {
        this.logger.info('Emitting userLoggedIn with user', user);
        return this.userLoggedInEvent.emit(user);
    }

    emitUserLoggedOut(user: User) {
        this.logger.info('Emitting userLoggedOut with user', user);
        return this.userLoggedOutEvent.emit(user);
    }
}
