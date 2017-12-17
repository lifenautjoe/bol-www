import { Injectable } from '@angular/core';
import * as Bluebird from 'bluebird';
import { Game } from '../models/game';
import { GamesApiService } from './games-api.service';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { LoggerFactoryService, Logolous } from './logger-factory.service';
import { Client, Message } from '@stomp/stompjs';
import { NoelEvent } from 'noel/dist/types/event';
import Noel from 'noel';
import { GamePlayOutcomeMessage } from '../messages/game-play-outcome-message';

@Injectable()
export class GameService {

    private static readonly STOMP_GAME_QUEUE_NAME = '/game';
    private static readonly SOCK_JS_PATH = '/ws';

    private logger: Logolous;
    private currentGame: Game;
    private stompConnection: Client;

    private gameMessageEvent: NoelEvent;
    private gameConnectionChangedEvent: NoelEvent;

    constructor(loggerFactoryService: LoggerFactoryService,
                private gamesApiService: GamesApiService) {
        this.logger = loggerFactoryService.make('GameService');
        const ee = new Noel();
        this.gameMessageEvent = ee.getEvent('onGamePlayOutcomeMessage');
        this.gameConnectionChangedEvent = ee.getEvent('onGameConnectionChanged');
    }

    onGameConnectionChanged(listener) {
        return this.gameConnectionChangedEvent.on(listener);
    }

    onGamePlayOutcomeMessage(listener: OnGamePlayOutcomeMessageListener) {
        return this.gameMessageEvent.on(listener);
    }

    disconnectFromCurrentGame() {
        if (this.stompConnection) {
            this.stompConnection.disconnect(() => {
                this.logger.info('Disconnected from socket');
                this.gameConnectionChangedEvent.emit(false);
            });
        }
    }

    connectToCurrentGame() {
        if (!this.hasGame()) {
            throw new Error('User has no game');
        }

        if (this.stompConnection) {
            throw new Error('User is already connected');
        }

        const socket = new SockJS(GameService.SOCK_JS_PATH);
        const stompClient = (this.stompConnection = Stomp.over(socket));

        stompClient.connect({}, (frame) => {
            this.logger.info('Connected to socket');
            this.gameConnectionChangedEvent.emit(true);
            const currentGameName = this.currentGame.getName();

            stompClient.subscribe(`${GameService.STOMP_GAME_QUEUE_NAME}/${currentGameName}`, (message: Message) => {
                const parsedBody = JSON.parse(message.body);
                this.logger.info('Received', message);
                this.gameMessageEvent.emit(parsedBody);
            });
        });
    }

    joinGame(game: Game): Bluebird<void> {
        if (this.hasGame()) {
            throw new Error('User is already in game');
        }
        return this.gamesApiService.joinGame(game).then(() => {
            this.setGame(game);
        });
    }

    hasGame(): boolean {
        return typeof this.currentGame !== 'undefined';
    }

    setGame(game: Game) {
        this.currentGame = game;
    }
}

export type OnGamePlayOutcomeMessageListener = (gamePlayOutcomeMessage: GamePlayOutcomeMessage) => void;


