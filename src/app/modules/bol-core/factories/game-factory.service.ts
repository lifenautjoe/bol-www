import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable()
export class GameFactoryService {

    constructor() {

    }

    make() {
        return new Game();
    }

}
