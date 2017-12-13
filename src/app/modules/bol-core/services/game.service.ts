import { Injectable } from '@angular/core';
import * as Bluebird from 'bluebird';
import { Game } from '../models/game';
import { GamesApiService } from './games-api.service';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { LoggerFactoryService, Logolous } from './logger-factory.service';
import { Message } from '@stomp/stompjs';

@Injectable()
export class GameService {

    private static readonly STOMP_GAME_QUEUE_NAME = '/game';
    private static readonly SOCK_JS_PATH = '/ws';

    private logger: Logolous;
    private currentGame: Game;

    constructor(loggerFactoryService: LoggerFactoryService,
                private gamesApiService: GamesApiService) {
        this.logger = loggerFactoryService.make('GameService');
    }

    joinGame(game: Game): Bluebird<void> {
        if (this.hasGame()) {
            throw new Error('User is already in game');
        }
        return this.gamesApiService.joinGame(game).then(() => {
            this.setGame(game);
        });
    }

    createGameWithName(gameName: string): Bluebird<Game> {
        return this.gamesApiService.createGameWithName(gameName);
    }

    hasGame(): boolean {
        return typeof this.currentGame === 'undefined';
    }

    private onGameMessage() {

    }

    private setGame(game: Game) {
        this.currentGame = game;
        this.connectToGame(this.currentGame);
    }

    private connectToGame(game: Game) {
        const gameName = game.getName();
        this.connectToGameWitName(gameName);
    }

    connectToGameWitName(gameName: string) {
        const socket = new SockJS(GameService.SOCK_JS_PATH);
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            this.logger.info('Connected to socket!');
            stompClient.subscribe(`${GameService.STOMP_GAME_QUEUE_NAME}/${gameName}`, (message: Message) => {
                this.logger.info('Received', message);
            });
        });
    }

}
