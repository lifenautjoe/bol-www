import { Injectable } from '@angular/core';
import * as Bluebird from 'bluebird';
import { Game, GameData } from '../models/game';
import { GameFactoryService } from '../factories/game-factory.service';
import { PromisedHttpService } from './promised-http.service';
import { ApiResponse } from '../models/api-response';

@Injectable()
export class GamesApiService {
    private static readonly GAMES_URL = 'api/games/';


    constructor(private promisedHttpService: PromisedHttpService,
                private gameFactoryService: GameFactoryService) {

    }

    getGames(): Bluebird<Array<Game>> {
        return this.promisedHttpService.get(GamesApiService.GAMES_URL, {responseType: 'json'})
            .then((gamesData: Array<GameData>) => {
                return gamesData.map(gameData => this.gameFactoryService.make(gameData));
            });
    }

    joinGame(): Bluebird<boolean> {

    }
}
